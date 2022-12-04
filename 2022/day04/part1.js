const { input } = require("./parse");

const checkIfContains = (range1, range2) => {
  if (range1.left <= range2.left && range1.right >= range2.right) return true;
  if (range2.left <= range1.left && range2.right >= range1.right) return true;
  return false;
};

let sum = 0;
for (let pair of input) {
  let [range1, range2] = pair;
  if (checkIfContains(range1, range2)) sum++;
}

console.log(sum);
