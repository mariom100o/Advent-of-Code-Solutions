const path = require("path");
const fs = require("fs");

const happinessMap = new Map();

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

for (let line of input) {
  let split = line.split(" ");
  let person = split[0];
  let happiness = parseInt(split[3]);
  let neighbor = split[split.length - 1].slice(0, -1);
  if (split[2] === "lose") happiness *= -1;
  happinessMap.set(person, [
    ...(happinessMap.get(person) || []),
    { neighbor, happiness },
  ]);
}

module.exports = {
  happinessMap,
};
