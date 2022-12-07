const path = require("path");
const fs = require("fs");

const sueNums = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line
      .split("")
      .filter((x) => x != "," && x != ":")
      .join("")
      .split(" ");
    return {
      num: split[1],
      traits: [
        { type: split[2], count: parseInt(split[3]) },
        { type: split[4], count: parseInt(split[5]) },
        { type: split[6], count: parseInt(split[7]) },
      ],
    };
  });

let trueSueTraits = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

let input = { sueNums, trueSueTraits };

module.exports = {
  input,
};
