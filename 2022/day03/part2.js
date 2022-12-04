const { input } = require("./parse");

let sum = 0;

for (let i = 0; i < input.length; i += 3) {
  for (let letter of input[i]) {
    if (input[i + 1].includes(letter) && input[i + 2].includes(letter)) {
      let charCode = letter.charCodeAt(0) - 96;
      if (charCode < 0) charCode += 32 + 26;
      sum += charCode;
      break;
    }
  }
}

console.log(sum);
