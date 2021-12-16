const path = require("path");
const fs = require("fs");

class Sonar {
    constructor(points) {
        this.points = points;
        this.max = this.calcMax();
        this.graph = Array(this.max.y + 1)
            .fill(0)
            .map(() => new Array(this.max.x + 1).fill(0));
    }

    calcMax() {
        let maxX = 0;
        let maxY = 0;
        for (let point of this.points) {
            maxX = Math.max(maxX, point.x1, point.x2);
            maxY = Math.max(maxY, point.y1, point.y2);
        }
        return { x: maxX, y: maxY };
    }

    plotStraight() {
        for (let line of this.points) {
            if (line.x1 == line.x2) {
                for (let i = Math.min(line.y1, line.y2); i <= Math.max(line.y1, line.y2); i++) {
                    this.graph[i][line.x1]++;
                }
            }
            if (line.y1 == line.y2) {
                for (let i = Math.min(line.x1, line.x2); i <= Math.max(line.x1, line.x2); i++) {
                    this.graph[line.y1][i]++;
                }
            }
        }
        return this;
    }

    plotDiagonal() {
        for (let line of this.points) {
            if (line.x1 != line.x2 && line.y1 != line.y2) {
                if (line.x1 > line.x2) {
                    if (line.y1 > line.y2) {
                        let x = line.x1;
                        for (let y = line.y1; y >= line.y2; y--) {
                            this.graph[y][x]++;
                            x--;
                        }
                    }
                    if (line.y1 < line.y2) {
                        let x = line.x1;
                        for (let y = line.y1; y <= line.y2; y++) {
                            this.graph[y][x]++;
                            x--;
                        }
                    }
                }
                if (line.x1 < line.x2) {
                    if (line.y1 > line.y2) {
                        let x = line.x1;
                        for (let y = line.y1; y >= line.y2; y--) {
                            this.graph[y][x]++;
                            x++;
                        }
                    }
                    if (line.y1 < line.y2) {
                        let x = line.x1;
                        for (let y = line.y1; y <= line.y2; y++) {
                            this.graph[y][x]++;
                            x++;
                        }
                    }
                }
            }
        }
        return this;
    }

    calcOverlapping() {
        let overlapCount = 0;
        for (let y = 0; y <= this.max.y; y++) {
            for (let x = 0; x <= this.max.x; x++) {
                if (this.graph[y][x] > 1) overlapCount++;
            }
        }
        return overlapCount;
    }
}

const sonar = new Sonar(
    fs
        .readFileSync(path.join(__dirname, "input.txt"), "utf8")
        .toString()
        .trim()
        .split("\n")
        .map((line) => {
            let points = line.split(" -> ");
            return {
                x1: parseInt(points[0].split(",")[0]),
                y1: parseInt(points[0].split(",")[1]),
                x2: parseInt(points[1].split(",")[0]),
                y2: parseInt(points[1].split(",")[1]),
            };
        })
);

module.exports = {
    sonar,
};
