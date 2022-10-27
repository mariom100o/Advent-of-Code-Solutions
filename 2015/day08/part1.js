const { input } = require("./parse");

let literalLength = 0;

for (let line of input) {
  literalLength += line.length;
}

let memoryLength = 0;

for (let line of input) {
  let memory = line
    .slice(1, line.length - 1)
    .replace(/\\\\/g, "\\")
    .replace(/\\"/g, '"')
    .replace(/\\x[a-fA-F0-9]{2}/g, "c");
  memoryLength += memory.length;
}

console.log(literalLength - memoryLength);
