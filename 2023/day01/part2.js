const { input } = require("./parse");

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const convertToInt = (num) => {
  switch (num) {
    case "one":
    case "1":
      return 1;
    case "two":
    case "2":
      return 2;
    case "three":
    case "3":
      return 3;
    case "four":
    case "4":
      return 4;
    case "five":
    case "5":
      return 5;
    case "six":
    case "6":
      return 6;
    case "seven":
    case "7":
      return 7;
    case "eight":
    case "8":
      return 8;
    case "nine":
    case "9":
      return 9;
  }
};

let sum = 0;

for (let line of input) {
  let leftIdx = line.length;
  let leftVal = -1;
  let rightIdx = -1;
  let rightVal = -1;

  for (num of numbers) {
    let idx = line.indexOf(num);
    if (idx !== -1 && idx < leftIdx) {
      leftIdx = idx;
      leftVal = convertToInt(num);
    }

    idx = line.lastIndexOf(num);
    if (idx !== -1 && idx > rightIdx) {
      rightIdx = idx;
      rightVal = convertToInt(num);
    }
  }

  sum += leftVal * 10;
  sum += rightVal;
}

console.log(sum);
