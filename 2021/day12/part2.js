const { caveArr } = require("./parse");

function checkIfLower(str) {
    if (str != str.toUpperCase()) return true;
    return false;
}

let smallCaves = [];
caveArr.forEach((value, key) => {
    if (checkIfLower(key) && key != "start" && key != "end") {
        smallCaves.push(key);
    }
});

let pathCount = 0;

for (let smallCave of smallCaves) {
    pathCount += caveArr.get("start").findPaths2([], smallCave, false);
}

let pathCountDupe = caveArr.get("start").findPaths([]) * (smallCaves.length - 1);

console.log(pathCount - pathCountDupe);
