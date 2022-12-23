const path = require("path");
const fs = require("fs");

const elfStates = [];
const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "#") {
      let state = {
        x: x,
        y: y,
        proposedX: null,
        proposedY: null,
        isMoving: false,
      };
      elfStates.push(state);
    }
  }
}

module.exports = {
  elfStates,
};
