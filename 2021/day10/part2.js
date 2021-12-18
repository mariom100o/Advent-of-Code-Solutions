const { input } = require("./parse");

function getMiddle(nums) {
    return nums[Math.floor(nums.length / 2)];
}

let scores = [];
for (let line of input) {
    // If it is incomplete
    if (line.findFirstIllegal() == 0) {
        scores.push(line.findNeeded());
    }
}

console.log(getMiddle(scores.sort((a, b) => a - b)));
