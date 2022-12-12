const path = require("path");
const fs = require("fs");

let StartEndPos = { startPos: { x: 0, y: 0 }, endPos: { x: 0, y: 0 } };

const heightMap = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line, indexY) =>
    line.split("").map((char, indexX) => {
      if (char === "S") {
        StartEndPos.startPos = { x: indexX, y: indexY };
        return Infinity;
      }
      if (char === "E") {
        StartEndPos.endPos = { x: indexX, y: indexY };
        return 122;
      } else return char.charCodeAt(0);
    })
  );

let input = { heightMap, ...StartEndPos };

module.exports = {
  input,
};
