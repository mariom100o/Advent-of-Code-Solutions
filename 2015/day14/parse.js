const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" ");
    return {
      name: split[0],
      fly: {
        speed: parseInt(split[3]),
        duration: parseInt(split[6]),
      },
      rest: parseInt(split[13]),
      points: 0,
      distance: 0,
    };
  });

module.exports = {
  input,
};
