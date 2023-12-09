const { input } = require("./parse");

let sum = 0;

for (let card of input) {
  let winningNums = new Set(card.winning);

  let pts = 0;
  for (let drawnNum of card.drawn) {
    console.log(drawnNum);
    if (winningNums.has(drawnNum)) {
      pts > 0 ? (pts *= 2) : (pts = 1);
    }
  }

  sum += pts;
}

console.log(sum);
