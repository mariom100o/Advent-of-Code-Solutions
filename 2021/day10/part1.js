const { input } = require("./parse");

let total = 0;
for (let line of input) {
    total += line.findFirstIllegal();
}

console.log(total);
