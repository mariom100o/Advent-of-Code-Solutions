const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n\n");

let seeds = input[0]
  .replace("seeds: ", "")
  .split(" ")
  .map((num) => parseInt(num));
input.shift();

// Get all of the maps
let maps = [];
for (let mapping of input) {
  let split = mapping.split("\n");
  let name = split.shift().replace(" map:", "");

  let ranges = split.map((range) => {
    let [destination, source, length] = range
      .split(" ")
      .map((num) => parseInt(num));
    return { destination, source, length };
  });

  maps.push({ name, ranges });
}

module.exports = {
  input: [seeds, maps],
};
