const { input } = require("./parse");

const checkIfOverlaps = (range1, range2) => {
  if (range1.left <= range2.right && range1 >= range2.left) return true;
  if (range1.right >= range2.left && range1.right <= range2.right) return true;
  if (range2.left <= range1.right && range2 >= range1.left) return true;
  if (range2.right >= range1.left && range2.right <= range1.right) return true;
  return false;
};

let sum = 0;
for (let pair of input) {
  let [range1, range2] = pair;
  if (checkIfOverlaps(range1, range2)) sum++;
}

console.log(sum);
