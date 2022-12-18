const { input } = require("./parse");
const path = require("path");
const fs = require("fs");
console.time("ExecutionTime");

const { rocks, pattern } = input;
const settledRock = new Set();

const checkCollision = (rock) => {
  for (let piece of rock) {
    if (settledRock.has(`${piece.x},${piece.y}`)) return "ROCK";
    if (piece.y <= 0) return "FLOOR";
    if (piece.x <= 0 || piece.x >= 8) return "WALL";
  }
  return false;
};

const updatePosition = (rock, tallestPoint) => {
  rock.forEach((piece) => {
    piece.y += tallestPoint + 4;
    piece.x += 3;
  });
  return rock;
};

const findTallestPoint = (rock, tallestPoint) => {
  for (let piece of rock) {
    tallestPoint = Math.max(tallestPoint, piece.y);
  }
  return tallestPoint;
};

let remainingPattern = [...pattern];
let tallestPoint = 0;
let i = 0;
const solve = () => {
  let rocksCopy = JSON.parse(JSON.stringify(rocks));

  let rock = rocksCopy[i++ % rocks.length];
  rock = updatePosition(rock, tallestPoint);

  let isFallNextMove = false;
  while (true) {
    if (isFallNextMove) {
      rock.forEach((piece) => {
        piece.y -= 1;
      });
      let checkCollisionResult = checkCollision(rock);
      if (checkCollisionResult === "ROCK" || checkCollisionResult === "FLOOR") {
        // Revert the fall and add the rock to the settledRock set
        rock.forEach((piece) => {
          piece.y += 1;
          settledRock.add(`${piece.x},${piece.y}`);
        });
        tallestPoint = findTallestPoint(rock, tallestPoint);
        break;
      }
    } else {
      let xMove = remainingPattern.shift() === ">" ? 1 : -1;
      if (remainingPattern.length === 0) remainingPattern = [...pattern];
      rock.forEach((piece) => {
        piece.x += xMove;
      });
      let checkCollisionResult = checkCollision(rock);
      if (checkCollisionResult === "ROCK" || checkCollisionResult === "WALL") {
        // Revert the move and fall
        rock.forEach((piece) => {
          piece.x -= xMove;
        });
      }
    }
    isFallNextMove = !isFallNextMove;
  }
  return rock;
};

// key: pattern
// value: { nextBlock, upcommingPattern, tallestPoint }
const memory = new Map();

const checkClosedPattern = (rock) => {
  let pattern = [];

  let minY = Infinity;
  let maxY = 0;

  for (let piece of rock) {
    minY = Math.min(minY, piece.y);
    maxY = Math.max(maxY, piece.y);
  }

  for (let y = minY; y <= maxY; y++)
    for (let x = 1; x <= 7; x++)
      if (settledRock.has(`${x},${y}`)) pattern.push(`x:${x}`);

  for (let y = minY; y <= maxY; y++) {
    let isInRow = true;
    for (let x = 1; x <= 7; x++) {
      if (!settledRock.has(`${x},${y}`)) {
        isInRow = false;
        break;
      }
    }
    if (isInRow) return pattern;
  }
  return false;
};

let placed = 0;
let startPoint = 0;
let startPlaced = 0;
while (true) {
  let placedRock = solve();
  placed++;
  let pattern = checkClosedPattern(placedRock);
  if (pattern) {
    if (memory.has(pattern.join(" "))) {
      let { nextBlock, upcommingPattern, tallestPointHistory, placedHistory } =
        memory.get(pattern.join(" "));
      if (
        placed % rocks.length === nextBlock &&
        upcommingPattern === remainingPattern.join("")
      ) {
        startPoint = tallestPointHistory;
        startPlaced = placedHistory;
        break;
      }
    }
    memory.set(pattern.join(" "), {
      nextBlock: placed % rocks.length,
      upcommingPattern: remainingPattern.join(""),
      tallestPointHistory: tallestPoint,
      placedHistory: placed,
    });
  }
}

let remaining = 1000000000000 - placed;
let gainedPer = tallestPoint - startPoint;
let reps = Math.floor(remaining / (placed - startPlaced));
let gained = reps * gainedPer;
let remainder = remaining % (placed - startPlaced);

for (let i = 0; i < remainder; i++) solve();

console.log(gained + tallestPoint);

console.timeEnd("ExecutionTime");
