const { input } = require("./parse");

const cardToValue = (card) => {
  if ("23456789".includes(card)) return parseInt(card) + 1;
  if (card == "J") return 2;
  if (card == "T") return 11;
  if (card == "Q") return 13;
  if (card == "K") return 14;
  if (card == "A") return 15;
};

const getScore = (hand) => {
  let score = 0;
  score += cardToValue(hand[0]) * 111111111;
  score += cardToValue(hand[1]) * 1111111;
  score += cardToValue(hand[2]) * 11111;
  score += cardToValue(hand[3]) * 111;
  score += cardToValue(hand[4]) * 1;
  return score;
};

const getHandScore = (hand) => {
  let counts = new Map();
  let jokers = 0;
  for (let card of hand) {
    if (card === "J") jokers++;
    else counts.set(card, (counts.get(card) || 0) + 1);
  }

  // 5 of a kind
  if (counts.size == 1 || jokers == 5) {
    console.log("5ofkind: ", hand);

    let score = 999999999999999 * getScore(hand);
    return score;
  }
  // 4 of a kind

  if (
    jokers == 4 ||
    (counts.size == 2 &&
      (Array.from(counts)[0][1] + jokers == 4 ||
        Array.from(counts)[1][1] + jokers == 4))
  ) {
    console.log("4ofkind: ", hand);

    return 9999999999999 * getScore(hand);
  }
  // Full house
  if (
    counts.size == 2 &&
    (Array.from(counts)[0][1] + jokers == 2 ||
      Array.from(counts)[0][1] + jokers == 3) &&
    (Array.from(counts)[1][1] + jokers == 3 ||
      Array.from(counts)[1][1] + jokers == 2)
  ) {
    console.log("fullhouse: ", hand);

    return 99999999999 * getScore(hand);
  }
  // 3 of a kind
  if (
    counts.size == 3 &&
    (Array.from(counts)[0][1] + jokers == 3 ||
      Array.from(counts)[1][1] + jokers == 3 ||
      Array.from(counts)[2][1] + jokers == 3)
  ) {
    console.log("3ofkind: ", hand);

    return 999999999 * getScore(hand);
  }
  // 2 pair
  if (
    counts.size == 3 &&
    (Array.from(counts)[0][1] + jokers == 2 || Array.from(counts)[0][1] == 1) &&
    (Array.from(counts)[1][1] + jokers == 2 || Array.from(counts)[1][1] == 1) &&
    (Array.from(counts)[2][1] + jokers == 2 || Array.from(counts)[2][1] == 1)
  ) {
    console.log("2pair: ", hand);

    return 9999999 * getScore(hand);
  }
  // 1 pair
  if (counts.size == 4) {
    console.log("1pair: ", hand);

    return 999999 * getScore(hand);
  }
  // High card
  console.log("highcard: ", hand);
  return 99999 * getScore(hand);
};

let hands = input;

hands.sort((a, b) => getHandScore(a.hand) - getHandScore(b.hand));

let winnings = 0;

for (let i = 0; i < hands.length; i++) {
  winnings += hands[i].bid * (i + 1);
}

console.log(winnings);
