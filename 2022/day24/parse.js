// TODO: Incomplete
const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let blizzardSet = new Set();
let wallPositions = new Set();

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === ">") blizzardSet.add(`${x},${y},>`);
    if (input[y][x] === "v") blizzardSet.add(`${x},${y},v`);
    if (input[y][x] === "^") blizzardSet.add(`${x},${y},^`);
    if (input[y][x] === "<") blizzardSet.add(`${x},${y},<`);
    if (input[y][x] === "#") wallPositions.add(`${x},${y}`);
  }
}

let startPos = { x: 1, y: 0 };
let endPos = { x: input[0].length - 2, y: input.length - 1 };
let inputs = { blizzardSet, startPos, endPos, wallPositions };

module.exports = {
  inputs,
};
