const { input } = require("./parse");

let cardCounts = new Map();

let currCard = 1;
for (let card of input) {
  if (!cardCounts.get(currCard)) cardCounts.set(currCard, 1);
  let winningNums = new Set(card.winning);

  let matching = 0;
  for (let drawnNum of card.drawn) {
    if (winningNums.has(drawnNum)) matching++;
  }

  for (let copy = currCard + 1; copy <= currCard + matching; copy += 1) {
    let currCardCopies = cardCounts.get(currCard);
    cardCounts.set(
      copy,
      cardCounts.get(copy) + currCardCopies || currCardCopies + 1
    );
  }

  currCard++;
}

let sum = 0;
for (let [key, val] of cardCounts) sum += val;
console.log(sum);
