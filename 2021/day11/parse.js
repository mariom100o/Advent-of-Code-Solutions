const path = require("path");
const fs = require("fs");

class Octopi {
    constructor(energyLevels) {
        this.energyLevels = energyLevels;
        this.flashed = Array(this.energyLevels.length)
            .fill(0)
            .map(() => new Array(this.energyLevels[0].length).fill(0));
    }

    flashOctopus(i, j) {
        if (this.flashed[i][j] == 0) {
            this.flashed[i][j] = 1;
            // Up
            if (i + 1 < this.energyLevels.length) {
                this.energyLevels[i + 1][j]++;
                if (this.energyLevels[i + 1][j] > 9) this.flashOctopus(i + 1, j);
            }
            // Down
            if (i - 1 >= 0) {
                this.energyLevels[i - 1][j]++;
                if (this.energyLevels[i - 1][j] > 9) this.flashOctopus(i - 1, j);
            }
            // Right
            if (j + 1 < this.energyLevels[i].length) {
                this.energyLevels[i][j + 1]++;
                if (this.energyLevels[i][j + 1] > 9) this.flashOctopus(i, j + 1);
            }
            // Left
            if (j - 1 >= 0) {
                this.energyLevels[i][j - 1]++;
                if (this.energyLevels[i][j - 1] > 9) this.flashOctopus(i, j - 1);
            }
            // Top left
            if (i + 1 < this.energyLevels.length && j - 1 >= 0) {
                this.energyLevels[i + 1][j - 1]++;
                if (this.energyLevels[i + 1][j - 1] > 9) this.flashOctopus(i + 1, j - 1);
            }
            // Top right
            if (i + 1 < this.energyLevels.length && j + 1 < this.energyLevels[i].length) {
                this.energyLevels[i + 1][j + 1]++;
                if (this.energyLevels[i + 1][j + 1] > 9) this.flashOctopus(i + 1, j + 1);
            }
            // Bottom left
            if (i - 1 >= 0 && j - 1 >= 0) {
                this.energyLevels[i - 1][j - 1]++;
                if (this.energyLevels[i - 1][j - 1] > 9) this.flashOctopus(i - 1, j - 1);
            }
            // Bottom right
            if (i - 1 >= 0 && j + 1 < this.energyLevels[i].length) {
                this.energyLevels[i - 1][j + 1]++;
                if (this.energyLevels[i - 1][j + 1] > 9) this.flashOctopus(i - 1, j + 1);
            }
        }
    }

    completeSteps(steps) {
        let flashedCount = 0;
        for (let step = 0; step < steps; step++) {
            for (let i = 0; i < this.energyLevels.length; i++) {
                for (let j = 0; j < this.energyLevels[i].length; j++) {
                    this.energyLevels[i][j]++;
                }
            }
            for (let i = 0; i < this.energyLevels.length; i++) {
                for (let j = 0; j < this.energyLevels[i].length; j++) {
                    if (this.energyLevels[i][j] > 9) this.flashOctopus(i, j);
                }
            }
            for (let i = 0; i < this.energyLevels.length; i++) {
                for (let j = 0; j < this.energyLevels[i].length; j++) {
                    if (this.flashed[i][j] == 1) {
                        flashedCount++;
                        this.energyLevels[i][j] = 0;
                    }
                }
            }
            this.flashed = Array(this.energyLevels.length)
                .fill(0)
                .map(() => new Array(this.energyLevels[0].length).fill(0));
        }
        return flashedCount;
    }

    findAllFlashed() {
        let isAllFlashed = false;
        let step = 0;
        while (!isAllFlashed) {
            step++;
            for (let i = 0; i < this.energyLevels.length; i++) {
                for (let j = 0; j < this.energyLevels[i].length; j++) {
                    this.energyLevels[i][j]++;
                }
            }
            for (let i = 0; i < this.energyLevels.length; i++) {
                for (let j = 0; j < this.energyLevels[i].length; j++) {
                    if (this.energyLevels[i][j] > 9) this.flashOctopus(i, j);
                }
            }
            let isAllFlashedTest = true;
            for (let i = 0; i < this.energyLevels.length; i++) {
                for (let j = 0; j < this.energyLevels[i].length; j++) {
                    if (this.flashed[i][j] == 1) {
                        this.energyLevels[i][j] = 0;
                    } else {
                        isAllFlashedTest = false;
                    }
                }
            }

            isAllFlashed = isAllFlashedTest ? true : false;

            this.flashed = Array(this.energyLevels.length)
                .fill(0)
                .map(() => new Array(this.energyLevels[0].length).fill(0));
        }
        return step;
    }
}

const octopi = new Octopi(
    fs
        .readFileSync(path.join(__dirname, "input.txt"), "utf8")
        .toString()
        .trim()
        .split("\n")
        .map((numArr) => {
            return numArr.split("").map((num) => parseInt(num));
        })
);

console.log(octopi);

module.exports = {
    octopi,
};
