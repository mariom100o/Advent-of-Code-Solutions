const { input } = require("./parse");

let checkpoints = [20, 60, 100, 140, 180, 220];
let strengthSum = 0;
let cycle = 1;
let x = 1;

for (let operation of input) {
  let prevX = x;
  if (operation.op === "noop") cycle++;
  else {
    x += operation.amount;
    cycle += 2;
  }

  if (checkpoints[0] === cycle) {
    strengthSum += x * checkpoints[0];
    checkpoints.shift();
  } else if (checkpoints[0] === cycle - 1) {
    strengthSum += prevX * checkpoints[0];
    checkpoints.shift();
  }
}

console.log(strengthSum);
