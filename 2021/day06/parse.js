const path = require("path");
const fs = require("fs");

class Lanternfish {
    constructor(age) {
        this.age = age;
    }

    ageDays(days) {
        let newFish = [];
        let children = [];
        newFish.push(this.age);
        for (let day = 0; day < days; day++) {
            for (let i = 0; i < newFish.length; i++) {
                if (newFish[i] == 0) {
                    children.push(8);
                    newFish[i] = 6;
                    continue;
                }
                newFish[i]--;
            }
            newFish = newFish.concat(children);
            children = [];
        }
        return newFish.length;
    }
    findChildCount(days, age) {
        // Make sure the age is at 6 by adding/subtracting days
        days = days + (6 - age) - 7;
        let childCount = 1;
        while (days >= 0) {
            childCount += this.findChildCount(days, 8);
            days -= 7;
        }
        return childCount;
    }
}

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .trim()
    .toString()
    .split(",")
    .map((num) => new Lanternfish(parseInt(num)));

module.exports = {
    input,
};
