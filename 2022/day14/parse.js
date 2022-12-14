const path = require("path");
const fs = require("fs");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" -> ");
    let points = split.map((point) => {
      let [x, y] = point.split(",");
      return { x: parseInt(x), y: parseInt(y) };
    });
    return points;
  });

// Determine the size of the sandMap
let minX = Infinity;
let maxX = 0;
let maxY = 0;

for (let line of lines) {
  for (let point of line) {
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
    minX = Math.min(minX, point.x);
  }
}

const sandMap = new Array(maxY + 1)
  .fill(0)
  .map(() => new Array(maxX - minX + 1).fill(0));

// Fill the sandMap with the points

for (let line of lines) {
  let prevPoint = line[0];
  for (let i = 1; i < line.length; i++) {
    let point = line[i];

    if (point.x === prevPoint.x) {
      let start = Math.min(prevPoint.y, point.y);
      let end = Math.max(prevPoint.y, point.y);
      for (let y = start; y <= end; y++) sandMap[y][point.x - minX] = 1;
    } else {
      let start = Math.min(prevPoint.x, point.x);
      let end = Math.max(prevPoint.x, point.x);
      for (let x = start; x <= end; x++) sandMap[point.y][x - minX] = 1;
    }

    prevPoint = point;
  }
}

let input = { sandMap, minX };

module.exports = {
  input,
};
