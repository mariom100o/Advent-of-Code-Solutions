const { input } = require("./parse");

let lanternfishProduction = Array(6).fill(0);
for (let i = 1; i < 6; i++) {
    lanternfishProduction[i] = input[0].findChildCount(256, i);
}

let sum = 0;
for (lanternfish of input) {
    sum += lanternfishProduction[lanternfish.age];
}

console.log(sum);
