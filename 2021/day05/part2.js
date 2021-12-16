const { sonar } = require("./parse");

let overlapCount = sonar.plotStraight().plotDiagonal().calcOverlapping();
console.log(overlapCount);
