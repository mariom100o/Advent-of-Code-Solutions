const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

let [time, distance] = input;
time = time
  .split(":")[1]
  .split(" ")
  .filter((n) => n)
  .map((num) => parseInt(num));

distance = distance
  .split(":")[1]
  .split(" ")
  .filter((n) => n)
  .map((num) => parseInt(num));

console.log(time, distance);

module.exports = {
  input: [time, distance],
};
