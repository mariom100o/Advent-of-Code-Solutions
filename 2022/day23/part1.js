const { elfStates } = require("./parse");
console.time("ExecutionTime");

// Checks if N, NW, NE are empty
const checkNorth = (x, y) => {
  for (let elf of elfStates) {
    if (elf.x === x && elf.y === y - 1) return false;
    if (elf.x === x - 1 && elf.y === y - 1) return false;
    if (elf.x === x + 1 && elf.y === y - 1) return false;
  }
  return true;
};

// Checks if S, SW, SE are empty
const checkSouth = (x, y) => {
  for (let elf of elfStates) {
    if (elf.x === x && elf.y === y + 1) return false;
    if (elf.x === x - 1 && elf.y === y + 1) return false;
    if (elf.x === x + 1 && elf.y === y + 1) return false;
  }
  return true;
};

// Checks if E, SE, NE are empty
const checkEast = (x, y) => {
  for (let elf of elfStates) {
    if (elf.x === x + 1 && elf.y === y) return false;
    if (elf.x === x + 1 && elf.y === y - 1) return false;
    if (elf.x === x + 1 && elf.y === y + 1) return false;
  }
  return true;
};

// Checks if W, NW, SW are empty
const checkWest = (x, y) => {
  for (let elf of elfStates) {
    if (elf.x === x - 1 && elf.y === y) return false;
    if (elf.x === x - 1 && elf.y === y - 1) return false;
    if (elf.x === x - 1 && elf.y === y + 1) return false;
  }
  return true;
};

// Checks if a proposed position is unique
const checkUnique = (x, y) => {
  let count = 0;
  for (let elf of elfStates) {
    if (elf.proposedX === x && elf.proposedY === y) count++;
    if (count > 1) return false;
  }
  return true;
};

// Checks if an elf is at a given position
const has = (x, y) => {
  for (let elf of elfStates) {
    if (elf.x === x && elf.y === y) return true;
  }
  return false;
};

// Moves elves to proposed positions if they are unique
const moveElves = () => {
  for (let elf of elfStates) {
    if (elf.isMoving && checkUnique(elf.proposedX, elf.proposedY)) {
      elf.x = elf.proposedX;
      elf.y = elf.proposedY;
    }
    elf.isMoving = false;
  }
};

// Checks 8 surrounding squares for elves
const isAlone = (x, y) => {
  if (has(x, y - 1)) return false;
  if (has(x - 1, y - 1)) return false;
  if (has(x + 1, y - 1)) return false;
  if (has(x + 1, y)) return false;
  if (has(x - 1, y)) return false;
  if (has(x, y + 1)) return false;
  if (has(x + 1, y + 1)) return false;
  if (has(x - 1, y + 1)) return false;
  return true;
};

let checks = ["N", "S", "W", "E"];
for (let round = 0; round < 10; round++) {
  for (let elf of elfStates) {
    if (isAlone(elf.x, elf.y)) {
      elf.isMoving = false;
      continue;
    }
    for (let check of checks) {
      if (check === "N" && checkNorth(elf.x, elf.y)) {
        elf.proposedX = elf.x;
        elf.proposedY = elf.y - 1;
        elf.isMoving = true;
        break;
      }
      if (check === "S" && checkSouth(elf.x, elf.y)) {
        elf.proposedX = elf.x;
        elf.proposedY = elf.y + 1;
        elf.isMoving = true;
        break;
      }
      if (check === "E" && checkEast(elf.x, elf.y)) {
        elf.proposedX = elf.x + 1;
        elf.proposedY = elf.y;
        elf.isMoving = true;
        break;
      }
      if (check === "W" && checkWest(elf.x, elf.y)) {
        elf.proposedX = elf.x - 1;
        elf.proposedY = elf.y;
        elf.isMoving = true;
        break;
      }
    }
  }
  let check = checks.shift();
  checks.push(check);
  moveElves();
}

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;

for (let elf of elfStates) {
  minX = Math.min(minX, elf.x);
  maxX = Math.max(maxX, elf.x);
  minY = Math.min(minY, elf.y);
  maxY = Math.max(maxY, elf.y);
}

let length = maxX - minX + 1;
let width = maxY - minY + 1;

let emptyCount = length * width - elfStates.length;

console.log(emptyCount);

console.timeEnd("ExecutionTime");
