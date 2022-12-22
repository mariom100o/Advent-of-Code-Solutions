const { notes } = require("./parse");
const { map, moves } = notes;
console.time("ExecutionTime");

const FACE_SIZE = 50;

const wrapMap = new Map();
// face,dir
wrapMap.set("1,3", "6,0");
wrapMap.set("1,2", "4,0");
wrapMap.set("2,0", "5,2");
wrapMap.set("2,1", "3,2");
wrapMap.set("2,3", "6,3");
wrapMap.set("3,0", "2,3");
wrapMap.set("3,2", "4,1");
wrapMap.set("4,3", "3,0");
wrapMap.set("4,2", "1,0");
wrapMap.set("5,0", "2,2");
wrapMap.set("5,1", "6,2");
wrapMap.set("6,0", "5,3");
wrapMap.set("6,1", "2,1");
wrapMap.set("6,2", "1,1");

const getFaceNum = (x, y) => {
  if (x >= 50 && x < 100 && y >= 0 && y < 50) return 1;
  if (x >= 100 && x < 150 && y >= 0 && y < 50) return 2;
  if (x >= 50 && x < 100 && y >= 50 && y < 100) return 3;
  if (x >= 0 && x < 50 && y >= 100 && y < 150) return 4;
  if (x >= 50 && x < 100 && y >= 100 && y < 150) return 5;
  if (x >= 0 && x < 50 && y >= 150 && y < 200) return 6;
};

const findFacePos = (faceNum) => {
  let faceCount = 0;
  for (let y = 0; y < map.length; y += FACE_SIZE) {
    for (let x = 0; x < map[y].length; x += FACE_SIZE) {
      if (map[y]?.[x] !== undefined && map[y][x] !== " ") faceCount++;
      if (faceCount === faceNum) return { x, y };
    }
  }
};

const findWrapPosition = (pos, dir) => {
  let faceNum = getFaceNum(pos.x, pos.y);
  let [newFace, newDir] = wrapMap
    .get(`${faceNum},${dir}`)
    .split(",")
    .map((n) => parseInt(n));
  let newPos = findFacePos(newFace);
  let relativeX = pos.x % FACE_SIZE;
  let relativeY = pos.y % FACE_SIZE;

  if (dir === 0) {
    if (newDir === 2) {
      newPos.x += FACE_SIZE - 1;
      newPos.y += FACE_SIZE - relativeY - 1;
    }
    if (newDir === 3) {
      newPos.y += FACE_SIZE - 1;
      newPos.x += relativeY;
    }
  }

  if (dir === 1) {
    if (newDir === 1) newPos.x += relativeX;
    if (newDir === 2) {
      newPos.x += FACE_SIZE - 1;
      newPos.y += relativeX;
    }
  }

  if (dir === 2) {
    if (newDir === 0) newPos.y += FACE_SIZE - relativeY - 1;
    if (newDir === 1) newPos.x += relativeY;
  }

  if (dir === 3) {
    if (newDir === 0) newPos.y += relativeX;
    if (newDir === 3) {
      newPos.x += relativeX;
      newPos.y += FACE_SIZE - 1;
    }
  }
  return { newPos, newDir };
};

const findNextPos = (move, pos, dir) => {
  for (let i = 0; i < move; i++) {
    let nextPos = { x: pos.x, y: pos.y };
    if (dir === 0) nextPos.x++;
    else if (dir === 1) nextPos.y++;
    else if (dir === 2) nextPos.x--;
    else if (dir === 3) nextPos.y--;
    if (
      map[nextPos.y]?.[nextPos.x] === undefined ||
      map[nextPos.y][nextPos.x] === " "
    ) {
      let { newPos, newDir } = findWrapPosition(pos, dir);
      if (map[newPos.y][newPos.x] === "#") return { pos, dir };
      nextPos.x = newPos.x;
      nextPos.y = newPos.y;
      dir = newDir;
    }

    if (map[nextPos.y][nextPos.x] === "#") {
      return { pos, dir };
    }

    pos.x = nextPos.x;
    pos.y = nextPos.y;
  }
  return { pos, dir };
};

let dir = 0;
let pos = { x: map[0].indexOf("."), y: 0 };

while (moves.length > 0) {
  let move = moves.shift();
  if (move === "L") dir = (dir + 3) % 4;
  else if (move === "R") dir = (dir + 1) % 4;
  else {
    let newState = findNextPos(move, pos, dir);
    pos = newState.pos;
    dir = newState.dir;
  }
}

let password = (pos.y + 1) * 1000 + (pos.x + 1) * 4 + dir;

console.log(password);

console.timeEnd("ExecutionTime");
