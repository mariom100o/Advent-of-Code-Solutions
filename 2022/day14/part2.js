const { input } = require("./parse");
let { sandMap, minX } = input;
console.time("ExecutionTime");

const sandMapLength = sandMap[0].length;

// Extend the sandMap to the left and right
sandMap = sandMap.map((line) => {
  let bufferLeft = new Array(line.length * 4).fill(0);
  let bufferRight = new Array(line.length * 4).fill(0);

  return bufferLeft.concat(line).concat(bufferRight);
});

// Extend the sandMap to the bottom and add a floor
let bufferAir = new Array(sandMap[0].length).fill(0);
let bufferFloor = new Array(sandMap[0].length).fill(1);
sandMap.push(bufferAir, bufferFloor);

const SAND_START = 500 - minX + sandMapLength * 4;
let notFull = true;
let landedSand = 0;

while (notFull) {
  let sandPos = { x: SAND_START, y: 0 };

  // While the sand has a place to fall, keep falling;
  let downOpen = sandMap[sandPos.y + 1][sandPos.x] === 0;
  let downLeftOpen = sandMap[sandPos.y + 1][sandPos.x - 1] === 0;
  let downRightOpen = sandMap[sandPos.y + 1][sandPos.x + 1] === 0;

  // If nothing is open, we've filled up the map
  if (!downOpen && !downLeftOpen && !downRightOpen) {
    landedSand++;
    notFull = false;
    break;
  }

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

    downOpen = sandMap[sandPos.y + 1][sandPos.x] === 0;
    downLeftOpen = sandMap[sandPos.y + 1][sandPos.x - 1] === 0;
    downRightOpen = sandMap[sandPos.y + 1][sandPos.x + 1] === 0;
  }
  sandMap[sandPos.y][sandPos.x] = 1;
  landedSand++;
}

console.log(landedSand);

console.timeEnd("ExecutionTime");
