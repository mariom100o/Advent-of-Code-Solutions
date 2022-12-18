const path = require("path");
const fs = require("fs");

const tunnelMap = new Map();
const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let neighbors = line.split(", ");
    neighbors[0] = neighbors[0].slice(-2);

    let valve = line.split(" ")[1];

    let flowRate = parseInt(line.split("=")[1].split(";")[0]);

    tunnelMap.set(valve, { neighbors, flowRate });
  });

module.exports = {
  tunnelMap,
};
