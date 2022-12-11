const { input } = require("./parse");

const ROUNDS = 10000;

let divisor = input.reduce((acc, monkey) => {
  return acc * monkey.test;
}, 1);

for (let i = 0; i < ROUNDS; i++) {
  for (let j = 0; j < input.length; j++) {
    let { items, operation, amount, test, trueMonkey, falseMonkey } = input[j];

    while (items.length > 0) {
      input[j].inspectCount++;
      let item = items.shift();
      let operand = amount === "old" ? item : parseInt(amount);

      if (operation === "+") item += operand;
      else if (operation === "*") item *= operand;

      item %= divisor;

      if (item % test === 0) input[trueMonkey].items.push(item);
      else input[falseMonkey].items.push(item);
    }
  }
}

input.sort((a, b) => b.inspectCount - a.inspectCount);

console.log(input[0].inspectCount * input[1].inspectCount);
