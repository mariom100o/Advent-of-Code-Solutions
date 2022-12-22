const { notes } = require("./parse");
const { map, moves } = notes;
console.time("ExecutionTime");

const findWrapPosition = (pos, dir) => {
  let oppositeDir = (dir + 2) % 4;
  let { x, y } = pos;

  while (map[y]?.[x] !== undefined && map[y][x] !== " ") {
    if (oppositeDir === 0) x++;
    else if (oppositeDir === 1) y++;
    else if (oppositeDir === 2) x--;
    else if (oppositeDir === 3) y--;
  }

  if (oppositeDir === 0) x--;
  else if (oppositeDir === 1) y--;
  else if (oppositeDir === 2) x++;
  else if (oppositeDir === 3) y++;

  return { x, y };
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
      let wrapPos = findWrapPosition(pos, dir);
      console.log("called", pos);
      if (map[wrapPos.y][wrapPos.x] === "#") return pos;
      nextPos.x = wrapPos.x;
      nextPos.y = wrapPos.y;
    }

    if (map[nextPos.y][nextPos.x] === "#") return pos;

    pos.x = nextPos.x;
    pos.y = nextPos.y;
  }

  return pos;
};

let dir = 0;
let pos = { x: map[0].indexOf("."), y: 0 };

while (moves.length > 0) {
  let move = moves.shift();

  if (move === "L") dir = (dir + 3) % 4;
  else if (move === "R") dir = (dir + 1) % 4;
  else {
    pos = findNextPos(move, pos, dir);
  }
}

let password = (pos.y + 1) * 1000 + (pos.x + 1) * 4 + dir;

console.log(password);

console.timeEnd("ExecutionTime");
