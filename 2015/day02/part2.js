const { input } = require("./parse");

let total = 0;

for (let box of input) {
  let dimensions = [box.l, box.w, box.h];
  dimensions.sort((a, b) => a - b);
  total += 2 * dimensions[0] + 2 * dimensions[1];
  total += box.l * box.w * box.h;
}

console.log(total);
