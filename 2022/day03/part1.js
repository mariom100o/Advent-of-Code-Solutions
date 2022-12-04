const { input } = require("./parse");

let sum = 0;

for (let rucksack of input) {
  let rucksack1 = rucksack.substring(0, rucksack.length / 2);
  let rucksack2 = rucksack.substring(rucksack.length / 2);

  for (let letter of rucksack1) {
    if (rucksack2.includes(letter)) {
      let charCode = letter.charCodeAt(0) - 96;
      if (charCode < 0) {
        charCode += 32 + 26;
      }
      sum += charCode;
      break;
    }
  }
}

console.log(sum);
