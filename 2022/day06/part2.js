const { input } = require("./parse");

const DISTINCT_CHARS = 14;

const allUnique = (arr) => {
  let visited = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (visited.has(arr[i])) return false;
    visited.add(arr[i]);
  }
  return true;
};

for (let i = 0; i < input.length - 4; i++) {
  if (allUnique(input.slice(i, i + DISTINCT_CHARS))) {
    console.log(i + DISTINCT_CHARS);
    break;
  }
}
