const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" ");
    return [
      parseInt(split[2]),
      parseInt(split[4]),
      parseInt(split[6]),
      parseInt(split[8]),
      parseInt(split[10]),
    ];
  });

module.exports = {
  input,
};
