const { input } = require("./parse");

let lightBoard = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

for (let instruction of input) {
  for (let x = instruction.start.x; x <= instruction.end.x; x++) {
    for (let y = instruction.start.y; y <= instruction.end.y; y++) {
      if (instruction.action === "on") lightBoard[x][y] = 1;
      else if (instruction.action === "off") lightBoard[x][y] = 0;
      else if (instruction.action === "toggle")
        lightBoard[x][y] = lightBoard[x][y] === 0 ? 1 : 0;
    }
  }
}

let count = 0;
for (let i = 0; i < lightBoard.length; i++) {
  for (let j = 0; j < lightBoard[i].length; j++) {
    if (lightBoard[i][j] === 1) count++;
  }
}

console.log(count);
