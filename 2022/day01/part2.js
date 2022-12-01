const { input } = require("./parse");

let sums = [];
for (let i = 0; i < input.length; i++) {
  let sum = 0;
  for (let j = 0; j < input[i].length; j++) {
    sum += parseInt(input[i][j]);
  }
  sums.push(sum);
}

sums.sort((a, b) => b - a);

console.log(sums[0] + sums[1] + sums[2]);
