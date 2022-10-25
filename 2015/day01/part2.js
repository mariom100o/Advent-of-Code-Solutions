const { input } = require("./parse");

let floor = 0;
let basementPosition;

for (let i = 0; i < input.length; i++) {
  input[i] === "(" ? floor++ : floor--;
  if (floor === -1) {
    basementPosition = i + 1;
    break;
  }
}

console.log(basementPosition);
