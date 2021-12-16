const { sonar } = require("./parse");

let overlapCount = sonar.plotStraight().calcOverlapping();
console.log(overlapCount);
