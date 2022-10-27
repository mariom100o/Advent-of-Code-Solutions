const { input } = require("./parse");

let literalLength = 0;

for (let line of input) {
  literalLength += line.length;
}

let encodedLength = 0;

for (let line of input) {
  let memory = line.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  encodedLength += memory.length + 2;
}

console.log(encodedLength - literalLength);
