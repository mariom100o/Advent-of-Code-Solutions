const path = require("path");
const fs = require("fs");

class Origami {
    constructor(dots, folds) {
        this.dots = dots;
        this.folds = folds;
        this.maxX = this.max("x");
        this.maxY = this.max("y");
    }

    max(axis) {
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (let dot of dots) {
            if (dot.x > maxX) maxX = dot.x;
            if (dot.y > maxY) maxY = dot.y;
        }
        if (axis == "x") return maxX;
        return maxY;
    }

    removeDupes() {
        let newDots = [];
        for (let dot of this.dots) {
            if (newDots.find((element) => element.x == dot.x && element.y == dot.y) == undefined) {
                newDots.push(dot);
            }
        }
        this.dots = newDots;
    }

    fold(n) {
        for (let i = 0; i < n; i++) {
            if (this.folds[i].axis == "y") {
                for (let j = 0; j < dots.length; j++) {
                    if (dots[j].y > this.folds[i].pos) {
                        dots[j].y = this.maxY - dots[j].y;
                    }
                }
            }
            if (this.folds[i].axis == "x") {
                for (let j = 0; j < dots.length; j++) {
                    if (dots[j].x > this.folds[i].pos) {
                        dots[j].x = this.maxX - dots[j].x;
                    }
                }
            }
            this.removeDupes();
            this.maxX = this.max("x");
            this.maxY = this.max("y");
        }
    }

    plot() {
        let graph = Array(this.maxY + 1)
            .fill(".")
            .map(() => new Array(this.maxX + 1).fill("."));
        for (let dot of this.dots) {
            graph[dot.y][dot.x] = "#";
        }
        let code = "";
        for (let line of graph) {
            code += line.join("");
            code += "\n";
        }
        return code;
    }
}

const instructions = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").toString().trim().split("\n\n");
const dots = instructions[0].split("\n").map((point) => {
    let dot = point.split(",");
    return { x: parseInt(dot[0]), y: parseInt(dot[1]) };
});
const folds = instructions[1].split("\n").map((fold) => {
    let foldPos = parseInt(fold.split("=")[1]);
    let foldAxis = fold[11];
    return { axis: foldAxis, pos: foldPos };
});

let origami = new Origami(dots, folds);

module.exports = {
    origami,
};
