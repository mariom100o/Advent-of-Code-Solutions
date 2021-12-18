const { input } = require("./parse");

function findMax(arr) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
function findMin(arr) {
    let min = Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
    }
    return min;
}

let max = findMax(input);
let min = findMin(input);

let fuel = Infinity;
for (let i = min; i <= max; i++) {
    currFuel = 0;
    for (let j = 0; j < input.length; j++) {
        currFuel += Math.abs(input[j] - i);
    }
    if (currFuel < fuel) fuel = currFuel;
}

console.log(fuel);
