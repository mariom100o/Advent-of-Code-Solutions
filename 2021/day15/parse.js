// TODO: Incomplete
const path = require("path");
const fs = require("fs");

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.split("").map((risk) => parseInt(risk)));

module.exports = {
    input,
};
