const { input } = require("./parse");

const checkDoublePair = (string) => {
  let pairs = new Map();
  for (let i = 0; i < string.length - 1; i++) {
    let pair = string[i] + string[i + 1];
    if (pairs.has(pair) && pairs.get(pair) !== i - 1) {
      return true;
    }
    pairs.set(pair, i);
  }
  return false;
};

const checkSandwich = (string) => {
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i + 2]) return true;
  }
  return false;
};

let niceStrings = 0;

for (let string of input) {
  if (!checkDoublePair(string)) continue;

  if (!checkSandwich(string)) continue;

  niceStrings++;
}

console.log(niceStrings);
