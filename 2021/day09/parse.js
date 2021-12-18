const path = require("path");
const fs = require("fs");

class Heightmap {
    constructor(heightmap) {
        this.heightmap = heightmap;
        this.lowPointIndices = [];
        this.visited = Array(this.heightmap.length)
            .fill(0)
            .map(() => new Array(this.heightmap[0].length).fill(0));
    }
    findLowPointsRisk() {
        let riskLevel = 0;
        for (let i = 0; i < this.heightmap.length; i++) {
            for (let j = 0; j < this.heightmap[i].length; j++) {
                if (i + 1 < this.heightmap.length && this.heightmap[i + 1][j] <= this.heightmap[i][j]) continue;

                if (i - 1 >= 0 && this.heightmap[i - 1][j] <= this.heightmap[i][j]) continue;

                if (j + 1 < this.heightmap[i].length && this.heightmap[i][j + 1] <= this.heightmap[i][j]) continue;

                if (j - 1 >= 0 && this.heightmap[i][j - 1] <= this.heightmap[i][j]) continue;
                this.lowPointIndices.push({ i: i, j: j });
                riskLevel += this.heightmap[i][j] + 1;
            }
        }
        return riskLevel;
    }
    findBasinSize(height, i, j) {
        let size = 1;
        this.visited[i][j] = 1;

        if (i + 1 < this.heightmap.length && this.visited[i + 1][j] == 0 && this.heightmap[i + 1][j] > height && this.heightmap[i + 1][j] != 9) {
            size += this.findBasinSize(this.heightmap[i + 1][j], i + 1, j);
        }

        if (i - 1 >= 0 && this.visited[i - 1][j] == 0 && this.heightmap[i - 1][j] > height && this.heightmap[i - 1][j] != 9) {
            size += this.findBasinSize(this.heightmap[i - 1][j], i - 1, j);
        }

        if (j + 1 < this.heightmap[0].length && this.visited[i][j + 1] == 0 && this.heightmap[i][j + 1] > height && this.heightmap[i][j + 1] != 9) {
            size += this.findBasinSize(this.heightmap[i][j + 1], i, j + 1);
        }

        if (j - 1 >= 0 && this.visited[i][j - 1] == 0 && this.heightmap[i][j - 1] > height && this.heightmap[i][j - 1] != 9) {
            size += this.findBasinSize(this.heightmap[i][j - 1], i, j - 1);
        }
        return size;
    }
    findLargestBasins() {
        let max = 0;
        let secondMax = 0;
        let thirdMax = 0;

        this.findLowPointsRisk();
        for (let lowPoint of this.lowPointIndices) {
            this.visited = Array(this.heightmap.length)
                .fill(0)
                .map(() => new Array(this.heightmap[0].length).fill(0));
            let size = this.findBasinSize(this.heightmap[lowPoint.i][lowPoint.j], lowPoint.i, lowPoint.j);
            if (size > max) {
                thirdMax = secondMax;
                secondMax = max;
                max = size;
            } else if (size > secondMax) {
                thirdMax = secondMax;
                secondMax = size;
            } else if (size > thirdMax) {
                thirdMax = size;
            }
        }
        return max * secondMax * thirdMax;
    }
}

const input = new Heightmap(
    fs
        .readFileSync(path.join(__dirname, "input.txt"), "utf8")
        .toString()
        .trim()
        .split("\n")
        .map((numArr) => {
            return numArr.split("").map((num) => parseInt(num));
        })
);

module.exports = {
    input,
};
