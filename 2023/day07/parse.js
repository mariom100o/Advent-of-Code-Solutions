const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let [hand, bid] = line.split(" ");
    return { hand, bid: parseInt(bid) };
  });

module.exports = {
  input,
};
