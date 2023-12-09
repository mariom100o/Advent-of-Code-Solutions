// TODO: Incomplete
const { inputs } = require("./parse");
const { blizzardSet, startPos, endPos } = inputs;
console.time("ExecutionTime");
let shortestPath = 15;

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

const findShortestPath = (currentPos, endPos, blizzardSet, timeSpent) => {
  if (currentPos.x <= 0 || currentPos.x > endPos.x) return;
  if (
    (currentPos.y <= 0 || currentPos.y > endPos.y) &&
    currentPos.x !== startPos.x &&
    currentPos.y !== startPos.y &&
    currentPos.x !== endPos.x &&
    currentPos.y !== endPos.y
  )
    return;

  if (currentPos.x === endPos.x && currentPos.y === endPos.y) {
    shortestPath = Math.min(shortestPath, timeSpent);
    return;
  }

  if (timeSpent >= shortestPath) return;

  let neighbors = [];

  while (neighbors.length === 0) {
    blizzardSet = new Set(updateBlizzardSet(blizzardSet));
    neighbors = getNeighbors(currentPos, blizzardSet);

    if (neighbors.length === 0 && hasBlizzard(currentPos, blizzardSet)) return;

    if (neighbors.length === 0) timeSpent++;
  }

  for (let neighbor of neighbors) {
    findShortestPath(neighbor, endPos, blizzardSet, timeSpent + 1);
  }
};

findShortestPath(startPos, endPos, blizzardSet, 0);
console.log(shortestPath);

console.timeEnd("ExecutionTime");
