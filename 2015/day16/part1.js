const { input } = require("./parse");

let { sueNums, trueSueTraits } = input;

let trueSue = sueNums.find((sue) => {
  return sue.traits.every((trait) => {
    return trueSueTraits[trait.type] === trait.count;
  });
});

console.log(trueSue.num);
