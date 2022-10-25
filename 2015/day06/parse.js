const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((instruction) => {
    let split = instruction.split(" ");
    let action = split[0] === "turn" ? split[1] : split[0];
    let start = split[split.length - 3].split(",");
    let end = split[split.length - 1].split(",");
    return {
      action,
      start: { x: parseInt(start[0]), y: parseInt(start[1]) },
      end: { x: parseInt(end[0]), y: parseInt(end[1]) },
    };
  });

module.exports = {
  input,
};
