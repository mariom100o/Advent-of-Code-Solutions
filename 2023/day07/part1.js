const { input } = require("./parse");

const cardToValue = (card) => {
  if ("23456789".includes(card)) return parseInt(card);
  if (card == "T") return 10;
  if (card == "J") return 11;
  if (card == "Q") return 12;
  if (card == "K") return 13;
  if (card == "A") return 14;
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
  for (let card of hand) counts.set(card, (counts.get(card) || 0) + 1);

  // 5 of a kind
  if (counts.size == 1) {
    let score = 999999999999999 * getScore(hand);
    return score;
  }
  // 4 of a kind
  if (
    counts.size == 2 &&
    (counts.get(hand[0]) == 4 || counts.get(hand[0]) == 1)
  ) {
    return 9999999999999 * getScore(hand);
  }
  // Full house
  if (
    counts.size == 2 &&
    (Array.from(counts)[0][1] == 2 || Array.from(counts)[0][1] == 3) &&
    (Array.from(counts)[1][1] == 3 || Array.from(counts)[1][1] == 2)
  ) {
    return 99999999999 * getScore(hand);
  }
  // 3 of a kind
  if (
    counts.size == 3 &&
    (Array.from(counts)[0][1] == 3 ||
      Array.from(counts)[1][1] == 3 ||
      Array.from(counts)[2][1] == 3)
  ) {
    return 999999999 * getScore(hand);
  }
  // 2 pair
  if (
    counts.size == 3 &&
    (Array.from(counts)[0][1] == 2 || Array.from(counts)[0][1] == 1) &&
    (Array.from(counts)[1][1] == 2 || Array.from(counts)[1][1] == 1) &&
    (Array.from(counts)[2][1] == 2 || Array.from(counts)[2][1] == 1)
  ) {
    return 9999999 * getScore(hand);
  }
  // 1 pair
  if (counts.size == 4) {
    return 999999 * getScore(hand);
  }
  // High card
  return 99999 * getScore(hand);
};

let hands = input;

hands.sort((a, b) => getHandScore(a.hand) - getHandScore(b.hand));

let winnings = 0;

for (let i = 0; i < hands.length; i++) {
  winnings += hands[i].bid * (i + 1);
}

console.log(winnings);
