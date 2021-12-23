const { caveArr } = require("./parse");
let pathCount = caveArr.get("start").findPaths([]);
console.log(pathCount);
