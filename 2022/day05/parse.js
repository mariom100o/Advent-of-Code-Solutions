const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n\n");

let containersInitial = input[0].split("\n");

let containerCount = (containersInitial[0].length + 1) / 4;
let containers = new Array(containerCount).fill("");

for (let i = 0; i < containersInitial.length - 1; i++) {
  let line = containersInitial[i];
  for (let i = 1; i < line.length; i += 4) {
    if (line[i] !== " ") {
      containers[Math.floor(i / 4)] += line[i];
    }
  }
}

let instructions = input[1]
  .trim()
  .split("\n")
  .map((instruction) => {
    let split = instruction.split(" ");
    return {
      count: parseInt(split[1]),
      from: parseInt(split[3]) - 1,
      to: parseInt(split[5]) - 1,
    };
  });

let inputs = { containers, instructions };

module.exports = {
  inputs,
};
