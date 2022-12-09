const { input } = require("./parse");

let snake = new Array(10).fill(0).map(() => ({ x: 0, y: 0 }));

let visited = new Set();

const isTouching = (knot1, knot2) => {
  let xDiff = Math.abs(knot1.x - knot2.x);
  let yDiff = Math.abs(knot1.y - knot2.y);
  return xDiff <= 1 && yDiff <= 1;
};

const moveKnot = (knot1, knot2) => {
  let newPos = { ...knot2 };
  let xDiff = knot2.x - knot1.x;
  let yDiff = knot2.y - knot1.y;

  if (xDiff > 0) newPos.x--;
  else if (xDiff < 0) newPos.x++;
  if (yDiff > 0) newPos.y--;
  else if (yDiff < 0) newPos.y++;

  return newPos;
};

for (let movement of input) {
  let { move, count } = movement;
  for (let i = 0; i < count; i++) {
    if (move === "U") snake[0].y++;
    else if (move === "D") snake[0].y--;
    else if (move === "L") snake[0].x--;
    else if (move === "R") snake[0].x++;

    for (let j = 1; j < snake.length; j++)
      if (!isTouching(snake[j - 1], snake[j]))
        snake[j] = moveKnot(snake[j - 1], snake[j]);

    visited.add(`${snake[9].x},${snake[9].y}`);
  }
}

console.log(visited.size);
