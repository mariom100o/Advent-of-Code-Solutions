const { input } = require("./parse");

let floor = 0;

for (let instruction of input) {
  instruction === "(" ? floor++ : floor--;
}

console.log(floor);
