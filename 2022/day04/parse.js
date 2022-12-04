const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) =>
    line.split(",").map((pair) => {
      let [left, right] = pair.split("-");
      return { left: parseInt(left), right: parseInt(right) };
    })
  );

console.log(input);

module.exports = {
  input,
};
