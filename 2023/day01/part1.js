const { input } = require("./parse");

let nums = input.map((line) =>
  line
    .split("")
    .filter((char) => "0123456789".includes(char))
    .join("")
);

let sum = 0;

for (line of nums) {
  sum += parseInt(line[0]) * 10;
  sum += parseInt(line[line.length - 1]);
}

console.log(sum);
