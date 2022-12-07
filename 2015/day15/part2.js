const { input } = require("./parse");

let teaspoons = new Array(input.length).fill(100 / input.length);

const calculateScore = (ingredients) => {
  let capacity = 0;
  let durability = 0;
  let flavor = 0;
  let texture = 0;
  let calories = 0;
  for (let i = 0; i < input.length; i++) {
    capacity += ingredients[i] * input[i][0];
    durability += ingredients[i] * input[i][1];
    flavor += ingredients[i] * input[i][2];
    texture += ingredients[i] * input[i][3];
    calories += ingredients[i] * input[i][4];
  }
  capacity = Math.max(0, capacity);
  durability = Math.max(0, durability);
  flavor = Math.max(0, flavor);
  texture = Math.max(0, texture);

  return calories == 500 ? capacity * durability * flavor * texture : -1;
};

let max = 0;
for (let a = 0; a <= 100; a++) {
  for (let b = 0; b <= 100 - a; b++) {
    for (let c = 0; c <= 100 - a - b; c++) {
      d = 100 - a - b - c;
      let score = calculateScore([a, b, c, d]);
      max = Math.max(max, score);
    }
  }
}

console.log(max);
