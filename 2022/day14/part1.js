const { input } = require("./parse");
const { sandMap, minX } = input;
console.time("ExecutionTime");

const SAND_START = 500 - minX;

let landedSand = 0;
let prevLanded = true;

while (prevLanded) {
  let sandPos = { x: SAND_START, y: 0 };

  // While the sand has a place to fall, keep falling
  let downOpen = sandMap[sandPos.y + 1][sandPos.x] === 0;
  let downLeftOpen = sandMap[sandPos.y + 1][sandPos.x - 1] === 0;
  let downRightOpen = sandMap[sandPos.y + 1][sandPos.x + 1] === 0;
  while (downOpen || downLeftOpen || downRightOpen) {
    if (downOpen) {
      sandPos.y++;
    } else if (downLeftOpen) {
      sandPos.x--;
      sandPos.y++;
    } else if (downRightOpen) {
      sandPos.x++;
      sandPos.y++;
    }

    // If any of the next positions are undefined it will fall forever
    if (
      sandMap[sandPos.y + 1] === undefined ||
      sandMap[sandPos.y + 1][sandPos.x - 1] === undefined ||
      sandMap[sandPos.y + 1][sandPos.x + 1] === undefined
    ) {
      prevLanded = false;
      landedSand--;
      break;
    }

    downOpen = sandMap[sandPos.y + 1][sandPos.x] === 0;
    downLeftOpen = sandMap[sandPos.y + 1][sandPos.x - 1] === 0;
    downRightOpen = sandMap[sandPos.y + 1][sandPos.x + 1] === 0;
  }
  sandMap[sandPos.y][sandPos.x] = 1;
  landedSand++;
}

console.log(landedSand);

console.timeEnd("ExecutionTime");
