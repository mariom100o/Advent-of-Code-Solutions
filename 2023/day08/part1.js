const { input } = require("./parse");

let [instructions, pathMap] = input;

let currInstruction = 0;
let curr = "AAA";
while (curr != "ZZZ") {
  let instruction = instructions[currInstruction % instructions.length];
  if (instruction === "R") curr = pathMap.get(curr).right;
  if (instruction === "L") curr = pathMap.get(curr).left;
  currInstruction++;
}

console.log(currInstruction);
