const { input } = require("./parse");

let total = 0;
for (let i = 1; i < input.length; i++) if (input[i] > input[i - 1]) total++;

console.log(total);
