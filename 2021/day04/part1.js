const { drawnNums } = require("./parse");
const { boards } = require("./parse");

function getWinningScore() {
    for (drawnNum of drawnNums) {
        for (board of boards) {
            if (board.markNum(drawnNum)) {
                return board.calcScore();
            }
        }
    }
}

console.log(getWinningScore());
