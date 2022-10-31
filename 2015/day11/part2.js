let password = "vzbxkghb";

let numbers = password.split("").map((char) => char.charCodeAt(0));

const increment = (numbers) => {
  let carry = true;
  for (let i = numbers.length - 1; i >= 0; i--) {
    if (!carry) break;
    if (numbers[i] === "z".charCodeAt(0)) {
      numbers[i] = "a".charCodeAt(0);
      carry = true;
    } else {
      numbers[i]++;
      carry = false;
    }
  }
  return numbers;
};

const hasStraight = (numbers) => {
  for (let i = 0; i < numbers.length - 2; i++) {
    if (
      numbers[i] + 1 === numbers[i + 1] &&
      numbers[i + 1] + 1 === numbers[i + 2]
    )
      return true;
  }
  return false;
};

const hasNoMistakenLetters = (numbers) => {
  return (
    !numbers.includes("i".charCodeAt(0)) &&
    !numbers.includes("o".charCodeAt(0)) &&
    !numbers.includes("l".charCodeAt(0))
  );
};

const hasTwoPairs = (numbers) => {
  const pairs = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] === numbers[i + 1] && !pairs.includes(numbers[i])) {
      pairs.push(numbers[i]);
    }
  }
  return pairs.length >= 2;
};

while (
  !hasStraight(numbers) ||
  !hasNoMistakenLetters(numbers) ||
  !hasTwoPairs(numbers)
) {
  numbers = increment(numbers);
}

// Do it again to get the next password
numbers = increment(numbers);

while (
  !hasStraight(numbers) ||
  !hasNoMistakenLetters(numbers) ||
  !hasTwoPairs(numbers)
) {
  numbers = increment(numbers);
}

console.log(String.fromCharCode(...numbers));
