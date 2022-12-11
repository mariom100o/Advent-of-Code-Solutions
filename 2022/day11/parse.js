const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n\n")
  .map((monkey) => {
    let split = monkey.split("\n");
    let items = split[1]
      .replace("Starting items: ", "")
      .split(", ")
      .map((num) => parseInt(num));
    let operationSplit = split[2].split(" ");
    let operation = operationSplit.slice(-2)[0];
    let amount = operationSplit.slice(-1)[0];
    let test = parseInt(split[3].replace("Test: divisible by ", ""));
    let trueMonkey = parseInt(
      split[4].replace("If true: throw to monkey ", "")
    );
    let falseMonkey = parseInt(
      split[5].replace("If false: throw to monkey ", "")
    );

    return {
      items,
      operation,
      amount,
      test,
      trueMonkey,
      falseMonkey,
      inspectCount: 0,
    };
  });

module.exports = {
  input,
};
