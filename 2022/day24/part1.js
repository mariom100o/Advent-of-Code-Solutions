// TODO: Incomplete
const { inputs } = require("./parse");
const { blizzardSet, startPos, endPos, wallPositions } = inputs;
console.time("ExecutionTime");

const updateBlizzardSet = (blizzardSet) => {
  let newBlizzardSet = new Set();

  for (let blizzard of blizzardSet) {
    let [x, y, direction] = blizzard.split(",");
    x = parseInt(x);
    y = parseInt(y);

    let newX = x;
    let newY = y;

    if (direction === ">") {
      newX++;
      if (newX > endPos.x) newX = 1;
    }
    if (direction === "v") {
      newY++;
      if (newY === endPos.y) newY = 1;
    }
    if (direction === "^") {
      newY--;
      if (newY === 0) newY = endPos.y - 1;
    }
    if (direction === "<") {
      newX--;
      if (newX === 0) newX = endPos.x - 1;
    }

    newBlizzardSet.add(`${newX},${newY},${direction}`);
  }
  return newBlizzardSet;
};

const hasBlizzard = (neighbor, blizzardSet) => {
  if (blizzardSet.has(`${neighbor.x},${neighbor.y},>`)) return true;
  if (blizzardSet.has(`${neighbor.x},${neighbor.y},<`)) return true;
  if (blizzardSet.has(`${neighbor.x},${neighbor.y},^`)) return true;
  if (blizzardSet.has(`${neighbor.x},${neighbor.y},v`)) return true;
  return false;
};

const inWall = (x, y) => {
  return wallPositions.has(`${x},${y}`);
};

const getNeighbors = (currentPos, blizzardSet) => {
  let neighbors = [];

  if (
    !hasBlizzard({ x: currentPos.x + 1, y: currentPos.y }, blizzardSet) &&
    !inWall(currentPos.x + 1, currentPos.y)
  ) {
    neighbors.push({ x: currentPos.x + 1, y: currentPos.y });
  }
  if (
    !hasBlizzard({ x: currentPos.x - 1, y: currentPos.y }, blizzardSet) &&
    !inWall(currentPos.x - 1, currentPos.y)
  )
    neighbors.push({ x: currentPos.x - 1, y: currentPos.y });
  if (
    !hasBlizzard({ x: currentPos.x, y: currentPos.y + 1 }, blizzardSet) &&
    !inWall(currentPos.x, currentPos.y + 1)
  )
    neighbors.push({ x: currentPos.x, y: currentPos.y + 1 });
  if (
    !hasBlizzard({ x: currentPos.x, y: currentPos.y - 1 }, blizzardSet) &&
    !inWall(currentPos.x, currentPos.y - 1) &&
    currentPos.y - 1 >= 0
  )
    neighbors.push({ x: currentPos.x, y: currentPos.y - 1 });

  return neighbors;
};

let shortestPath = 100;
let queue = [{ currentPos: startPos, distance: 0, blizzardSet }];
let visitedCount = new Map();

let step = 0;
while (queue.length > 0) {
  let { currentPos, distance, blizzardSet } = queue.shift();
  if (currentPos.x === endPos.x && currentPos.y === endPos.y) {
    shortestPath = Math.min(shortestPath, distance);
    continue;
  }

  if (distance >= shortestPath) continue;

  let neighbors = [];

  while (neighbors.length === 0) {
    blizzardSet = new Set(updateBlizzardSet(blizzardSet));
    neighbors = getNeighbors(currentPos, blizzardSet);
    if (neighbors.length === 0 && hasBlizzard(currentPos, blizzardSet)) {
      break;
    }

    if (neighbors.length === 0) distance++;
  }

  for (let neighbor of neighbors) {
    queue.push({
      currentPos: neighbor,
      distance: distance + 1,
      blizzardSet,
    });
  }
}

console.log(shortestPath);

console.timeEnd("ExecutionTime");
