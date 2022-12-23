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

// Moves elves to proposed positions if they are unique and returns the number of elves moved
const moveElves = () => {
  let count = 0;
  for (let elf of elfStates) {
    if (elf.isMoving && checkUnique(elf.proposedX, elf.proposedY)) {
      elf.x = elf.proposedX;
      elf.y = elf.proposedY;
      count++;
    }
    elf.isMoving = false;
  }

  for (let elf of elfStates) {
    elf.proposedX = null;
    elf.proposedY = null;
  }
  return count;
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
let count = 0;
while (true) {
  count++;
  for (let elf of elfStates) {
    if (isAlone(elf.x, elf.y)) continue;

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
  checks.push(checks.shift());
  let movedElves = moveElves();
  if (movedElves === 0) break;
}

console.log(count);

console.timeEnd("ExecutionTime");
