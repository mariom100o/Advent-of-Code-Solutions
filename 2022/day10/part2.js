const { input } = require("./parse");

let crt = new Array(6).fill("");
let cycle = 0;
let x = 1;

for (let operation of input) {
  let line = Math.floor(cycle / 40);
  let index = cycle % 40;
  crt[line] += Math.abs(index - x) <= 1 ? "X" : ".";
  cycle++;
  if (operation.op === "addx") {
    line = Math.floor(cycle / 40);
    index = cycle % 40;
    crt[line] += Math.abs(index - x) <= 1 ? "X" : ".";
    cycle++;
    x += operation.amount;
  }
}

console.log(crt);
