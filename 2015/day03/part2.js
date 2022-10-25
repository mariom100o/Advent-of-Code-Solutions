const { input } = require("./parse");

let visitedMap = new Map();

let pos = { x: 0, y: 0 };

let santaDirections = input.filter((_, i) => i % 2 === 0);
let roboDirections = input.filter((_, i) => i % 2 === 1);

for (let movement of santaDirections) {
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
visitedMap.set(`${pos.x},${pos.y}`, true);

pos = { x: 0, y: 0 };

for (let movement of roboDirections) {
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
visitedMap.set(`${pos.x},${pos.y}`, true);

console.log(visitedMap.size);
