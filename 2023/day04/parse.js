const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let nums = line.split(": ")[1];
    let [winning, drawn] = nums.split(" | ");

    return {
      winning: winning
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .map((num) => parseInt(num)),
      drawn: drawn
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .map((num) => parseInt(num)),
    };
  });

module.exports = {
  input,
};
