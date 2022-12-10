const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" ");
    if (split.length === 1) return { op: split[0] };
    else return { op: split[0], amount: parseInt(split[1]) };
  });

module.exports = {
  input,
};
