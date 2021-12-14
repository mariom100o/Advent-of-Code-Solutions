const { drawnNums } = require("./parse");
const { boards } = require("./parse");

function getWinningScore() {
    let winningScore;
    for (drawnNum of drawnNums) {
        for (board of boards) {
            if (!board.checkWin() && board.markNum(drawnNum)) {
                winningScore = board.calcScore();
            }
        }
    }
    return winningScore;
}

console.log(getWinningScore());
