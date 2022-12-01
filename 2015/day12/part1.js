const { input } = require("./parse");

let sum = 0;
let nums = input.matchAll(/-?\d+/g);

for (let num of nums) {
  sum += parseInt(num[0]);
}

console.log(sum);
