const path = require("path");
const fs = require("fs");

const flightMap = new Map();

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

input.forEach((line) => {
  let [from, to, distance] = line
    .replace(" to ", " ")
    .replace(" = ", " ")
    .split(" ");
  let currentFrom = flightMap.get(from) || [];
  currentFrom.push({ to, distance: parseInt(distance) });
  flightMap.set(from, currentFrom);

  let currentTo = flightMap.get(to) || [];
  currentTo.push({ to: from, distance: parseInt(distance) });
  flightMap.set(to, currentTo);
});

module.exports = {
  flightMap,
};
