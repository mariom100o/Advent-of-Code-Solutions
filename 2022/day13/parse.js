const path = require("path");
const fs = require("fs");

const stringToArray = (stringArr) => {
  let array = [];

  stringArr = stringArr.substring(1, stringArr.length - 1);
  let queue = stringArr.split("");

  while (queue.length > 0) {
    let char = queue.shift();
    if (char === "[") {
      let subStringArr = getStringArray("[" + queue.join(""));
      array.push(stringToArray(subStringArr));
      for (let i = 0; i < subStringArr.length - 1; i++) queue.shift();
    } else if ("0123456789".includes(char)) {
      let currNum = char;

      while ("0123456789".includes(queue[0])) {
        currNum += queue.shift();
      }

      array.push(parseInt(currNum));
    }
  }
  return array;
};

const getStringArray = (string) => {
  let balance = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "[") balance++;
    if (string[i] === "]") balance--;
    if (balance === 0) {
      return string.substring(0, i + 1);
    }
  }
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n\n")
  .map((group) =>
    group.split("\n").map((line) => {
      return stringToArray(line);
    })
  );

module.exports = {
  input,
};
