const path = require("path");
const fs = require("fs");

const wireMap = new Map();

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

for (let instruction of input) {
  let split = instruction.split(" -> ");
  let from = split[0].split(" ");

  if (from.length === 1) {
    wireMap.set(split[1], {
      action: "assign",
      from: from[0],
    });
  } else if (from.length === 2) {
    wireMap.set(split[1], {
      action: "NOT",
      from: from[1],
    });
  } else if (from.length === 3) {
    wireMap.set(split[1], {
      action: from[1],
      from: { wire1: from[0], wire2: from[2] },
    });
  }
}
module.exports = {
  wireMap,
};
