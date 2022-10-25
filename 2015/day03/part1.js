const { input } = require("./parse");

let visitedMap = new Map();

let pos = { x: 0, y: 0 };

for (let movement of input) {
  visitedMap.set(`${pos.x},${pos.y}`, true);
  switch (movement) {
    case ">":
      pos.x++;
      break;
    case "<":
      pos.x--;
      break;
    case "^":
      pos.y++;
      break;
    case "v":
      pos.y--;
      break;
  }
}

console.log(visitedMap.size);
