const { input } = require("./parse");

let head = { x: 0, y: 0, prevX: 0, prevY: 0 };
let tail = { x: 0, y: 0 };

let visited = new Set();

const isTouching = () => {
  let xDiff = Math.abs(head.x - tail.x);
  let yDiff = Math.abs(head.y - tail.y);
  return xDiff <= 1 && yDiff <= 1;
};

for (let movement of input) {
  let { move, count } = movement;
  for (let i = 0; i < count; i++) {
    head.prevX = head.x;
    head.prevY = head.y;
    if (move === "U") head.y++;
    else if (move === "D") head.y--;
    else if (move === "L") head.x--;
    else if (move === "R") head.x++;

    if (!isTouching()) {
      tail.x = head.prevX;
      tail.y = head.prevY;
    }

    visited.add(`${tail.x},${tail.y}`);
  }
}

console.log(visited.size);
