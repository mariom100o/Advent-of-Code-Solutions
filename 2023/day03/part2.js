const { input } = require("./parse");

const findCompleteNum = (i, j) => {
  let num = input[i][j];

  // Get right nums
  curr = j;
  while (input[i][curr + 1] && "0123456789".includes(input[i][curr + 1])) {
    num += input[i][curr + 1];
    curr++;
  }
  // Get left nums
  curr = j;
  while (input[i][curr - 1] && "0123456789".includes(input[i][curr - 1])) {
    num = input[i][curr - 1] + num;
    curr--;
  }

  return num;
};

console.log(findCompleteNum(0, 1));

let sum = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    if (input[i][j] === "*") {
      let partNums = [];
      // Up
      if ("0123456789".includes(input[i - 1][j]))
        partNums.push(findCompleteNum(i - 1, j));
      else {
        // Top left
        if ("0123456789".includes(input[i - 1][j - 1]))
          partNums.push(findCompleteNum(i - 1, j - 1));
        // Top right
        if ("0123456789".includes(input[i - 1][j + 1]))
          partNums.push(findCompleteNum(i - 1, j + 1));
      }
      // Down
      if ("0123456789".includes(input[i + 1][j]))
        partNums.push(findCompleteNum(i + 1, j));
      else {
        // Bottom left
        if ("0123456789".includes(input[i + 1][j - 1]))
          partNums.push(findCompleteNum(i + 1, j - 1));
        // Bottom right
        if ("0123456789".includes(input[i + 1][j + 1]))
          partNums.push(findCompleteNum(i + 1, j + 1));
      }
      // Left
      if ("0123456789".includes(input[i][j - 1]))
        partNums.push(findCompleteNum(i, j - 1));
      // Right
      if ("0123456789".includes(input[i][j + 1]))
        partNums.push(findCompleteNum(i, j + 1));

      if (partNums.length === 2) {
        sum += parseInt(partNums[0]) * parseInt(partNums[1]);
      }
    }
  }
}

console.log(sum);
