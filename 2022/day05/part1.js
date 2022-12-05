const { inputs } = require("./parse");

let { containers, instructions } = inputs;

for (let instruction of instructions) {
  let taken = containers[instruction.from].substring(0, instruction.count);
  taken = taken.split("").reverse().join("");

  let left = containers[instruction.from].substring(instruction.count);
  containers[instruction.from] = left;

  containers[instruction.to] = taken + containers[instruction.to];
}

let result = "";
for (let container of containers) {
  result += container[0];
}

console.log(result);
