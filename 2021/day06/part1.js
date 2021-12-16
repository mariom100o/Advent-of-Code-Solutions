const { input } = require("./parse");
let sum = 0;
for (let i = 0; i < input.length; i++) {
    sum += input[i].ageDays(80);
}
console.log(sum);
