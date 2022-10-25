const { input } = require("./parse");

const checkCombos = (string) => {
  for (combo of ["ab", "cd", "pq", "xy"]) {
    if (string.includes(combo)) {
      return true;
    }
  }
  return false;
};

const checkDouble = (string) => {
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] === string[i + 1]) {
      return true;
    }
  }
  return false;
};

const checkVowels = (string) => {
  let vowels = 0;
  for (let i = 0; i < string.length; i++) {
    if (["a", "e", "i", "o", "u"].includes(string[i])) {
      vowels++;
    }
  }
  return vowels >= 3;
};

let niceStrings = 0;

for (let string of input) {
  if (checkCombos(string)) {
    continue;
  }
  if (!checkDouble(string)) {
    continue;
  }
  if (!checkVowels(string)) {
    continue;
  }
  niceStrings++;
}

console.log(niceStrings);
