const path = require("path");
const fs = require("fs");

class Board {
    constructor(boardNums) {
        this.lastNum = "";
        this.boardNums = boardNums;
        this.markedNums = Array(5)
            .fill(0)
            .map(() => new Array(5).fill(0));
    }

    calcScore() {
        let unmarkedNumSum = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (this.markedNums[i][j] == 0) {
                    unmarkedNumSum += parseInt(this.boardNums[i][j]);
                }
            }
        }
        return unmarkedNumSum * parseInt(this.lastNum);
    }

    checkWin() {
        for (let i = 0; i < 5; i++) {
            // Check all vertical lines
            for (let j = 0; i < 5; j++) {
                if (this.markedNums[j][i] == 0) break;
                if (j == 4) return true;
            }
            // Check all horizontal lines
            for (let j = 0; i < 5; j++) {
                if (this.markedNums[i][j] == 0) break;
                if (j == 4) return true;
            }
        }
        return false;
    }

    markNum(num) {
        this.lastNum = num;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (this.boardNums[i][j] == num) {
                    this.markedNums[i][j] = 1;
                    return this.checkWin();
                }
            }
        }
    }
}

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").toString().trim().split("\n\n");
const drawnNums = input.shift().split(",");

const boards = input.map((board) => {
    return new Board(board.split("\n").map((row) => row.split(" ").filter((num) => num != "")));
});

module.exports = {
    drawnNums,
    boards,
};
