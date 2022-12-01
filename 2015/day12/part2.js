const { input } = require("./parse");

const removeRedObjects = (input) => {
  const redIndexes = [];
  let redIndex = input.indexOf(':"red"');
  while (redIndex !== -1) {
    redIndexes.push(redIndex);
    redIndex = input.indexOf(':"red"', redIndex + 1);
  }

  let redObjs = [];
  for (let redIndex of redIndexes) {
    let start = redIndex;
    let curlyBraces = 0;
    let squareBrackets = 0;
    while (curlyBraces !== 1 && squareBrackets !== 1) {
      start--;
      if (input[start] === "}") curlyBraces--;
      else if (input[start] === "{") curlyBraces++;

      if (input[start] === "]") squareBrackets--;
      else if (input[start] === "[") squareBrackets++;
    }
    if (input[start] === "[") continue;
    let braces = 1;
    let end = start + 1;
    while (braces > 0) {
      if (input[end] === "{") braces++;
      if (input[end] === "}") braces--;
      end++;
    }
    redObjs.push(input.slice(start, end));
  }

  redObjs.sort((a, b) => b.length - a.length);

  for (let redObj of redObjs) {
    input = input.replace(redObj, "");
  }
  return input;
};

let nonRedInput = removeRedObjects(input);
let sum = 0;
let nums = nonRedInput.matchAll(/-?\d+/g);

for (let num of nums) {
  sum += parseInt(num[0]);
}

console.log(sum);
