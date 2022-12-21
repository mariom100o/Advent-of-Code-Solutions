const path = require("path");
const fs = require("fs");

const monkeyMap = new Map();

fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(": ");
    let monkey = split[0];
    let job = split[1].split(" ");
    if (job.length > 1) {
      let operand1 = job[0];
      let operator = job[1];
      let operand2 = job[2];
      monkeyMap.set(monkey, {
        type: "operation",
        operand1,
        operator,
        operand2,
      });
    } else {
      let number = parseInt(job[0]);
      monkeyMap.set(monkey, {
        type: "number",
        number,
      });
    }
  });

module.exports = {
  monkeyMap,
};
