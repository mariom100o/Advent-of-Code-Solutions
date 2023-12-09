const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n\n");

let [instructions, map] = input;
let pathMap = new Map();
let startingNodes = [];
map = map.split("\n").map((line) => {
  let [parent, children] = line.split(" = ");
  if (parent[2] === "A") startingNodes.push(parent);
  let [left, right] = children.split(", ");
  left = left.substring(1);
  right = right.substring(0, right.length - 1);
  pathMap.set(parent, { left, right });
});

module.exports = {
  input: [instructions, pathMap, startingNodes],
};
