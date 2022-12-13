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

let sum = 0;

for (let i = 0; i < input.length; i++) {
  if (isCorrectOrder(input[i][0], input[i][1])) sum += i + 1;
}

console.log(sum);

console.timeEnd("ExecutionTime");
