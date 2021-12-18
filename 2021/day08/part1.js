const { displays } = require("./parse");

let sum = 0;
for (let display of displays) {
    sum += display.countUniqueCodes();
}

console.log(sum);
