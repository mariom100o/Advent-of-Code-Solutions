const path = require("path");
const fs = require("fs");

// ####
let rock1 = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
];
// .#.
// ###
// .#.
let rock2 = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
];
// ..#
// ..#
// ###
let rock3 = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
];
// #
// #
// #
// #
let rock4 = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
];
// ##
// ##
let rock5 = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const pattern = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("");

let rocks = [rock1, rock2, rock3, rock4, rock5];
let input = { rocks, pattern };

module.exports = {
  input,
};
