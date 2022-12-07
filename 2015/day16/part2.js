const { input } = require("./parse");

let { sueNums, trueSueTraits } = input;

let trueSue = sueNums.find((sue) => {
  return sue.traits.every((trait) => {
    if (trait.type === "cats" || trait.type === "trees")
      return trueSueTraits[trait.type] < trait.count;
    if (trait.type === "pomeranians" || trait.type === "goldfish")
      return trueSueTraits[trait.type] > trait.count;
    return trueSueTraits[trait.type] === trait.count;
  });
});

console.log(trueSue.num);
