const { input } = require("./parse");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let sum = 0;

for (let i = 0; i < input.length; i++) {
  let game = input[i];
  let possible = true;
  for (let set of game) {
    for (let cubes of set) {
      if (cubes.color == "red" && cubes.count > MAX_RED) possible = false;
      if (cubes.color == "blue" && cubes.count > MAX_BLUE) possible = false;
      if (cubes.color == "green" && cubes.count > MAX_GREEN) possible = false;
    }
  }
  if (possible) sum += i + 1;
}

console.log(sum);
