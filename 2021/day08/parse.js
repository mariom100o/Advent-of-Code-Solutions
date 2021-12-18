const path = require("path");
const fs = require("fs");

class Display {
    constructor(pattern, output) {
        this.pattern = pattern;
        this.output = output;
        this.numMap = this.getNumMap();
    }

    deduceLetters(str, deducer) {
        for (let i = 0; i < deducer.length; i++) {
            str = str.replace(deducer[i], "");
        }
        return str;
    }

    getNumMap() {
        let oneCode;
        let fourCode;
        let threeCode;
        let sevenCode;
        let eightCode;
        let nineCode;
        let sixCode;
        let currDisplayPos;
        const numMap = new Map();
        // Get each unqiue code
        for (let code of this.pattern) {
            if (code.length == 2) {
                oneCode = code;
            }
            if (code.length == 4) {
                fourCode = code;
            }
            if (code.length == 3) {
                sevenCode = code;
            }
            if (code.length == 7) {
                eightCode = code;
            }
        }
        // Get actual letter for position "a"
        currDisplayPos = this.deduceLetters(sevenCode, oneCode);
        numMap.set("a", currDisplayPos);

        // Get actual letter for position "g"
        for (let code of this.pattern) {
            if (code.length == 6) {
                currDisplayPos = this.deduceLetters(code, fourCode + numMap.get("a"));
                if (currDisplayPos.length == 1) {
                    numMap.set("g", currDisplayPos);
                    nineCode = code;
                }
            }
        }

        // Get actual letter for position "d"
        for (let code of this.pattern) {
            if (code.length == 5) {
                currDisplayPos = this.deduceLetters(code, oneCode + numMap.get("a") + numMap.get("g"));
                if (currDisplayPos.length == 1) {
                    numMap.set("d", currDisplayPos);
                    threeCode = code;
                }
            }
        }

        // Get actual letter for position "c"
        for (let code of this.pattern) {
            if (code.length == 6 && code != nineCode) {
                if (code.includes(numMap.get("d"))) {
                    sixCode = code;
                    currDisplayPos = this.deduceLetters(fourCode, sixCode);
                    numMap.set("c", currDisplayPos);
                }
            }
        }

        // Get actual letter for position "f"
        currDisplayPos = this.deduceLetters(oneCode, numMap.get("c"));
        numMap.set("f", currDisplayPos);

        // Get actual letter for position "b"
        currDisplayPos = this.deduceLetters(fourCode, numMap.get("d") + numMap.get("c") + numMap.get("f"));
        numMap.set("b", currDisplayPos);

        // Get actual letter for position "e"
        currDisplayPos = this.deduceLetters(
            eightCode,
            numMap.get("a") + numMap.get("b") + numMap.get("c") + numMap.get("d") + numMap.get("f") + numMap.get("g")
        );
        numMap.set("e", currDisplayPos);

        return numMap;
    }

    sortStr(str) {
        let strArr = [];
        for (let char of str) {
            strArr.push(char);
        }
        strArr.sort();
        return strArr.join("");
    }

    getDigit(code) {
        let currCode = "";
        // Build string for 0 digit
        currCode =
            this.numMap.get("a") + this.numMap.get("b") + this.numMap.get("c") + this.numMap.get("e") + this.numMap.get("f") + this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "0";
        // Build string for 1 digit
        currCode = this.numMap.get("c") + this.numMap.get("f");
        if (this.sortStr(code) == this.sortStr(currCode)) return "1";
        // Build string for 2 digit
        currCode = this.numMap.get("a") + this.numMap.get("c") + this.numMap.get("d") + this.numMap.get("e") + this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "2";
        // Build string for 3 digit
        currCode = this.numMap.get("a") + this.numMap.get("c") + this.numMap.get("d") + this.numMap.get("f") + this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "3";
        // Build string for 4 digit
        currCode = this.numMap.get("b") + this.numMap.get("c") + this.numMap.get("d") + this.numMap.get("f");
        if (this.sortStr(code) == this.sortStr(currCode)) return "4";
        // Build string for 5 digit
        currCode = this.numMap.get("a") + this.numMap.get("b") + this.numMap.get("d") + this.numMap.get("f") + this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "5";
        // Build string for 6 digit
        currCode =
            this.numMap.get("a") + this.numMap.get("b") + this.numMap.get("d") + this.numMap.get("e") + this.numMap.get("f") + this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "6";
        // Build string for 7 digit
        currCode = this.numMap.get("a") + this.numMap.get("c") + this.numMap.get("f");
        if (this.sortStr(code) == this.sortStr(currCode)) return "7";
        // Build string for 8 digit
        currCode =
            this.numMap.get("a") +
            this.numMap.get("b") +
            this.numMap.get("c") +
            this.numMap.get("d") +
            this.numMap.get("e") +
            this.numMap.get("f") +
            this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "8";
        // Build string for 9 digit
        currCode =
            this.numMap.get("a") + this.numMap.get("b") + this.numMap.get("c") + this.numMap.get("d") + this.numMap.get("f") + this.numMap.get("g");
        if (this.sortStr(code) == this.sortStr(currCode)) return "9";
    }

    countUniqueCodes() {
        let uniqueCount = 0;
        for (let pattern of this.output) {
            if (pattern.length == 2 || pattern.length == 3 || pattern.length == 4 || pattern.length == 7) uniqueCount++;
        }
        return uniqueCount;
    }

    getOutputVal() {
        let value = "";
        for (let code of this.output) {
            value += this.getDigit(code);
        }
        return parseInt(value);
    }
}

const displays = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n")
    .map((pattern) => {
        pattern = pattern.split(" | ");
        return new Display(pattern[0].split(" "), pattern[1].split(" "));
    });

module.exports = {
    displays,
};
