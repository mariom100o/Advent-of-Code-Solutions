const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n\n");

const map = input[0].split("\n").map((line) => line.split(""));

let rawMoves = input[1];
let moves = [];
let num = "";

for (let i = 0; i < rawMoves.length; i++) {
  if (rawMoves[i] === "L" || rawMoves[i] === "R") {
    moves.push(parseInt(num));
    moves.push(rawMoves[i]);
    num = "";
  } else {
    num += rawMoves[i];
  }
}
moves.push(parseInt(num));

const notes = { map, moves };

module.exports = {
  notes,
};
