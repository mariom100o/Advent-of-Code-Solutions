const { input } = require("./parse");

let hPos = 0;
let depth = 0;

for (let i = 0; i < input.length; i++) {
    switch (input[i].direction) {
        case "forward":
            hPos += input[i].amount;
            break;
        case "up":
            depth -= input[i].amount;
            break;
        case "down":
            depth += input[i].amount;
            break;
    }
}

console.log(hPos * depth);
