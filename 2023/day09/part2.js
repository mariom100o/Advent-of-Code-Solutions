const { input } = require("./parse");

const allSameNum = (nums) => {
  for (let i = 1; i < nums.length; i++)
    if (nums[i - 1] !== nums[i]) return false;
  return true;
};

let sum = 0;

for (let line of input) {
  let currSeq = line;
  let history = [line];
  while (!allSameNum(currSeq)) {
    let newSeq = [];
    for (let i = 1; i < currSeq.length; i++) {
      newSeq.push(currSeq[i] - currSeq[i - 1]);
    }
    history.push(newSeq);
    currSeq = newSeq;
  }

  let currExtrapolated = history[history.length - 1][0];
  for (let i = history.length - 2; i >= 0; i--) {
    let newExtrapolated = history[i][0] - currExtrapolated;
    history[i].unshift(newExtrapolated);
    currExtrapolated = newExtrapolated;
  }
  sum += history[0][0];
}

console.log(sum);
