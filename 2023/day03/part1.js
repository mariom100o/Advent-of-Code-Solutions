const { input } = require("./parse");

const findCompleteNum = (i, j) => {
  let num = input[i][j];

  // Get right nums
  while (input[i][j + 1] && "0123456789".includes(input[i][j + 1])) {
    num += input[i][j + 1];
    j++;
  }

  return num;
};

let sum = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    if ("0123456789".includes(input[i][j])) {
      let num = findCompleteNum(i, j);
      for (let pos = j - 1; pos <= j + num.length; pos++) {
        if (input[i - 1]?.[pos] && !".0123456789".includes(input[i - 1][pos])) {
          sum += parseInt(num);
          j += num.length;
          break;
        }
        if (input[i]?.[pos] && !".0123456789".includes(input[i][pos])) {
          sum += parseInt(num);
          j += num.length;
          break;
        }
        if (input[i + 1]?.[pos] && !".0123456789".includes(input[i + 1][pos])) {
          sum += parseInt(num);
          j += num.length;
          break;
        }
      }
    }
  }
}

console.log(sum);
