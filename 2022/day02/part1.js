const { input } = require("./parse");

const PLAY = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
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
  let [opponentMove, myMove] = game;
  if (myMove === PLAY.ROCK) {
    score += SCORES.ROCK;
    if (opponentMove === OPPONENT.ROCK) score += SCORES.DRAW;
    if (opponentMove === OPPONENT.SCISSORS) score += SCORES.WIN;
  }
  if (myMove === PLAY.PAPER) {
    score += SCORES.PAPER;
    if (opponentMove === OPPONENT.PAPER) score += SCORES.DRAW;
    if (opponentMove === OPPONENT.ROCK) score += SCORES.WIN;
  }
  if (myMove === PLAY.SCISSORS) {
    score += SCORES.SCISSORS;
    if (opponentMove === OPPONENT.SCISSORS) score += SCORES.DRAW;
    if (opponentMove === OPPONENT.PAPER) score += SCORES.WIN;
  }
}

console.log(score);
