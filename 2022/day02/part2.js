const { input } = require("./parse");

const RESULT = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
};

const OPPONENT = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const SCORES = {
  WIN: 6,
  DRAW: 3,
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

let score = 0;

for (let game of input) {
  let [opponentMove, result] = game;
  if (result === RESULT.LOSE) {
    if (opponentMove === OPPONENT.ROCK) score += SCORES.SCISSORS;
    if (opponentMove === OPPONENT.PAPER) score += SCORES.ROCK;
    if (opponentMove === OPPONENT.SCISSORS) score += SCORES.PAPER;
  }
  if (result === RESULT.DRAW) {
    score += SCORES.DRAW;
    if (opponentMove === OPPONENT.ROCK) score += SCORES.ROCK;
    if (opponentMove === OPPONENT.PAPER) score += SCORES.PAPER;
    if (opponentMove === OPPONENT.SCISSORS) score += SCORES.SCISSORS;
  }
  if (result === RESULT.WIN) {
    score += SCORES.WIN;
    if (opponentMove === OPPONENT.ROCK) score += SCORES.PAPER;
    if (opponentMove === OPPONENT.PAPER) score += SCORES.SCISSORS;
    if (opponentMove === OPPONENT.SCISSORS) score += SCORES.ROCK;
  }
}

console.log(score);
