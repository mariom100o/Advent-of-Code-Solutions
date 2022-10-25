const { input } = require("./parse");

console.log(input);

let total = 0;
for (let box of input) {
  let face1 = 2 * box.l * box.w;
  let face2 = 2 * box.w * box.h;
  let face3 = 2 * box.h * box.l;
  total += face1 + face2 + face3 + Math.min(face1, face2, face3) / 2;
}

console.log(total);
