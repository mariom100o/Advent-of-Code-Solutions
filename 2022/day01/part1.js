const { input } = require("./parse");

let max = 0;
for (let i = 0; i < input.length; i++) {
  let sum = 0;
  for (let j = 0; j < input[i].length; j++) {
    sum += parseInt(input[i][j]);
  }
  max = Math.max(max, sum);
}

console.log(max);
