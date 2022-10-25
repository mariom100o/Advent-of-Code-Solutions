const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let dimensions = line.split("x");
    return {
      l: parseInt(dimensions[0]),
      w: parseInt(dimensions[1]),
      h: parseInt(dimensions[2]),
    };
  });

module.exports = {
  input,
};
