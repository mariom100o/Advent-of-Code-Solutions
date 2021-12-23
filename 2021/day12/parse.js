const path = require("path");
const fs = require("fs");

let caveArr = new Map();
class Cave {
    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    checkIfLower(str) {
        if (str != str.toUpperCase()) return true;
        return false;
    }

    findPaths(visited) {
        visited = [...visited];
        if (this.name == "end") return 1;

        if (this.checkIfLower(this.name)) {
            visited.push(this.name);
        }
        let sum = 0;

        for (let connection of this.connections) {
            if (visited.find((element) => element == connection) == undefined && connection != "start") {
                sum += caveArr.get(connection).findPaths(visited);
            }
        }

        return sum;
    }
    findPaths2(visited, doubleSmall, doubleSmallUsed) {
        visited = [...visited];

        if (this.name == "end") return 1;

        if (this.checkIfLower(this.name) && this.name != doubleSmall) {
            visited.push(this.name);
        }
        if (doubleSmallUsed && this.name == doubleSmall) {
            visited.push(this.name);
        }
        if (this.name == doubleSmall) doubleSmallUsed = true;

        let sum = 0;

        for (let connection of this.connections) {
            if (visited.find((element) => element == connection) == undefined && connection != "start") {
                sum += caveArr.get(connection).findPaths2(visited, doubleSmall, doubleSmallUsed);
            }
        }
        return sum;
    }
}

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n")
    .map((path) => {
        let caves = path.split("-");
        if (caveArr.get(caves[0]) == undefined) {
            let newCave = new Cave(caves[0]);
            newCave.connections.push(caves[1]);
            caveArr.set(caves[0], newCave);
        } else {
            caveArr.get(caves[0]).connections.push(caves[1]);
        }
        if (caveArr.get(caves[1]) == undefined) {
            let newCave = new Cave(caves[1]);
            newCave.connections.push(caves[0]);
            caveArr.set(caves[1], newCave);
        } else {
            caveArr.get(caves[1]).connections.push(caves[0]);
        }
    });

module.exports = {
    caveArr,
};
