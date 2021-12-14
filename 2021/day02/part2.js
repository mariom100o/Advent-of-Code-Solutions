const { input } = require("./parse");

let hPos = 0;
let depth = 0;
let aim = 0;

for (let i = 0; i < input.length; i++) {
    switch (input[i].direction) {
        case "forward":
            hPos += input[i].amount;
            depth += aim * input[i].amount;
            break;
        case "up":
            aim -= input[i].amount;
            break;
        case "down":
            aim += input[i].amount;
            break;
    }
}

console.log(hPos * depth);
