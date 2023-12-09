const { input } = require("./parse");

let sum = 0;

for (let i = 0; i < input.length; i++) {
  let game = input[i];
  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;
  for (let set of game) {
    for (let cubes of set) {
      if (cubes.color == "red" && cubes.count > maxRed) maxRed = cubes.count;
      if (cubes.color == "blue" && cubes.count > maxBlue) maxBlue = cubes.count;
      if (cubes.color == "green" && cubes.count > maxGreen)
        maxGreen = cubes.count;
    }
  }
  sum += maxRed * maxBlue * maxGreen;
}

console.log(sum);
