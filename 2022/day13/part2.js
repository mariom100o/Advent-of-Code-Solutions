const { input } = require("./parse");
console.time("ExecutionTime");

const isCorrectOrder = (left, right) => {
  for (let i = 0; i < left.length; i++) {
    // Right side ran out, so wrong order
    if (right[i] === undefined) return false;

    let oneIsArray = false;
    // Both are arrays
    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      oneIsArray = true;
      let correctOrder = isCorrectOrder(left[i], right[i]);
      if (correctOrder !== null) return correctOrder;
      // Left is array, so compare left with right in an array
    } else if (Array.isArray(left[i])) {
      oneIsArray = true;
      let correctOrder = isCorrectOrder(left[i], [right[i]]);
      if (correctOrder !== null) return correctOrder;
      // Right is array, so compare left in an array with right
    } else if (Array.isArray(right[i])) {
      oneIsArray = true;
      let correctOrder = isCorrectOrder([left[i]], right[i]);
      if (correctOrder !== null) return correctOrder;
    }

    if (!oneIsArray) {
      // Left side is smaller, so correct order
      if (left[i] < right[i]) return true;
      // Right side is smaller, so wrong order
      else if (left[i] > right[i]) return false;
    }
  }

  // If left ran out, it is correct order, otherwise no order is found
  return left.length < right.length ? true : null;
};

let joinedInput = input.reduce((acc, cur) => {
  return [...acc, cur[0], cur[1]];
}, []);

const dividerPacket1 = [[2]];
const dividerPacket2 = [[6]];

joinedInput.push(dividerPacket1);
joinedInput.push(dividerPacket2);

joinedInput.sort((a, b) => (isCorrectOrder(a, b) ? -1 : 1));

let decoderKey1 = joinedInput.indexOf(dividerPacket1) + 1;
let decoderKey2 = joinedInput.indexOf(dividerPacket2) + 1;

console.log(decoderKey1 * decoderKey2);

console.timeEnd("ExecutionTime");
