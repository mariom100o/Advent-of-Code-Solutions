const path = require("path");
const fs = require("fs");

class SyntaxLine {
    constructor(line) {
        this.line = line;
        this.incompleted;
    }

    getCorruptScore(char) {
        if (char == ")") return 3;
        if (char == "]") return 57;
        if (char == "}") return 1197;
        if (char == ">") return 25137;
    }

    getIncompleteScore(char) {
        if (char == ")") return 1;
        if (char == "]") return 2;
        if (char == "}") return 3;
        if (char == ">") return 4;
    }

    getClosingChar(char) {
        if (char == "(") return ")";
        if (char == "[") return "]";
        if (char == "{") return "}";
        if (char == "<") return ">";
    }

    findFirstIllegal() {
        for (let i = 0; i < this.line.length; i++) {
            if (this.line[i] == "(" || this.line[i] == "[" || this.line[i] == "{" || this.line[i] == "<") {
                let balance = 1;
                for (let j = i + 1; j < this.line.length; j++) {
                    if (this.line[j] == "(" || this.line[j] == "[" || this.line[j] == "{" || this.line[j] == "<") balance++;
                    else balance--;

                    if (balance == 0 && this.getClosingChar(this.line[i]) != this.line[j]) {
                        return this.getCorruptScore(this.line[j]);
                    } else if (balance == 0) break;
                }
            }
        }
        return 0;
    }

    findNeeded() {
        let required = "";
        for (let char of this.line) {
            if (char == "(" || char == "[" || char == "{" || char == "<") {
                required = this.getClosingChar(char) + required;
            } else {
                required = required.substring(1);
            }
        }
        let score = 0;
        console.log(required);
        for (let char of required) {
            score *= 5;
            score += this.getIncompleteScore(char);
        }
        return score;
    }
}

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n")
    .map((line) => new SyntaxLine(line));

module.exports = {
    input,
};
