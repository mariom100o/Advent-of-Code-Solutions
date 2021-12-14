const path = require("path");
const fs = require("fs");

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n")
    .map((num) => {
        let command = num.split(" ");
        return { direction: command[0], amount: parseInt(command[1], 10) };
    });

module.exports = {
    input,
};
