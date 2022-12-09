const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let [move, count] = line.split(" ");
    count = parseInt(count);
    return { move, count };
  });

module.exports = {
  input,
};
