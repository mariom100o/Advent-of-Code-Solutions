const { input } = require("./parse");

let [instructions, pathMap, startingNodes] = input;

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

let loopLengths = [];

for (let node of startingNodes) {
  let first = -1;
  let second = -1;

  let currInstruction = 0;
  let steps = 0;
  while (first === -1 || second === -1) {
    steps++;
    let instruction = instructions[currInstruction % instructions.length];
    if (instruction === "R") node = pathMap.get(node).right;
    if (instruction === "L") node = pathMap.get(node).left;

    if (node[2] === "Z") {
      if (first === -1) first = steps;
      else second = steps;
    }

    currInstruction++;
  }

  loopLengths.push(second - first);
}

console.log(loopLengths.reduce(lcm));
