const { input } = require("./parse");

const isVisible = (i, j) => {
  let height = input[i][j];
  let visible = 4;
  for (let k = i - 1; k >= 0; k--) {
    if (input[k][j] >= height) {
      visible--;
      break;
    }
  }
  for (let k = i + 1; k < input.length; k++) {
    if (input[k][j] >= height) {
      visible--;
      break;
    }
  }
  for (let k = j - 1; k >= 0; k--) {
    if (input[i][k] >= height) {
      visible--;
      break;
    }
  }
  for (let k = j + 1; k < input[i].length; k++) {
    if (input[i][k] >= height) {
      visible--;
      break;
    }
  }
  return visible > 0;
};

let visible = input.length * 2 + input[0].length * 2 - 4;

for (let i = 1; i < input.length - 1; i++) {
  for (let j = 1; j < input[i].length - 1; j++) {
    if (isVisible(i, j)) {
      visible++;
    }
  }
}

console.log(visible);
