const { input } = require("./parse");

const visibleTrees = (i, j) => {
  let height = input[i][j];
  let up = 0;
  let down = 0;
  let left = 0;
  let right = 0;
  for (let k = i - 1; k >= 0; k--) {
    up++;
    if (input[k][j] >= height) break;
  }
  for (let k = i + 1; k < input.length; k++) {
    down++;
    if (input[k][j] >= height) break;
  }
  for (let k = j - 1; k >= 0; k--) {
    left++;
    if (input[i][k] >= height) break;
  }
  for (let k = j + 1; k < input[i].length; k++) {
    right++;
    if (input[i][k] >= height) break;
  }
  return up * down * left * right;
};

let max = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    max = Math.max(max, visibleTrees(i, j));
  }
}

console.log(max);
