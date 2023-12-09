// TODO: Incomplete
const { inputs } = require("./parse");
const { blizzardSet, startPos, endPos } = inputs;
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
      if (newY > endPos.y) newY = 1;
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

const getNeighbors = (currentPos, blizzardSet) => {
  let neighbors = [];

  if (!hasBlizzard({ x: currentPos.x + 1, y: currentPos.y }, blizzardSet))
    neighbors.push({ x: currentPos.x + 1, y: currentPos.y });
  if (!hasBlizzard({ x: currentPos.x - 1, y: currentPos.y }, blizzardSet))
    neighbors.push({ x: currentPos.x - 1, y: currentPos.y });
  if (!hasBlizzard({ x: currentPos.x, y: currentPos.y + 1 }, blizzardSet))
    neighbors.push({ x: currentPos.x, y: currentPos.y + 1 });
  if (!hasBlizzard({ x: currentPos.x, y: currentPos.y - 1 }, blizzardSet))
    neighbors.push({ x: currentPos.x, y: currentPos.y - 1 });

  return neighbors;
};

const bfs = (startPos, endPos, blizzardSet) => {
  let queue = [];
  let visited = new Set();
  let shortestPath = 15;

  queue.push({ pos: startPos, path: 0, blizzardSet });
};

console.timeEnd("ExecutionTime");
