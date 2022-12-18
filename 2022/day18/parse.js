const path = require("path");
const fs = require("fs");

let squarePositions = new Set();

fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let [x, y, z] = line.split(",").map((n) => parseInt(n));
    squarePositions.add(`${x},${y},${z}`);
  });

module.exports = {
  squarePositions,
};
