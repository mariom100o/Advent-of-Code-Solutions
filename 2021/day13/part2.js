const { origami } = require("./parse");
origami.fold(origami.folds.length);
let code = origami.plot();
console.log(code);
