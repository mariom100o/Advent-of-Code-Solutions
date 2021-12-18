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

function calcFuelUsage(distance) {
    let fuel = 0;
    for (let i = distance; i >= 1; i--) {
        fuel += i;
    }
    return fuel;
}

let max = findMax(input);
let min = findMin(input);

let fuel = Infinity;
for (let i = min; i <= max; i++) {
    currFuel = 0;
    for (let j = 0; j < input.length; j++) {
        currFuel += calcFuelUsage(Math.abs(input[j] - i));
    }
    if (currFuel < fuel) fuel = currFuel;
}

console.log(fuel);
