const path = require("path");
const fs = require("fs");

class Polymerization {
    constructor(template, pairs) {
        this.template = template;
        this.pairs = pairs;
        this.pairMap = this.mapPairs();
        this.elementMap = this.mapElements();
    }

    mapPairs() {
        let pairMap = new Map();
        for (let pair of pairs) {
            pairMap.set(pair.pair, 0);
        }
        for (let i = 1; i < template.length; i++) {
            let currPair = template[i - 1] + template[i];
            pairMap.set(currPair, pairMap.get(currPair) + 1);
        }
        return pairMap;
    }

    mapElements() {
        let elementMap = new Map();
        for (let i = 0; i < template.length; i++) {
            if (!elementMap.has(template[i])) {
                elementMap.set(template[i], 1);
            } else {
                elementMap.set(template[i], elementMap.get(template[i]) + 1);
            }
        }
        return elementMap;
    }

    completeSteps(n) {
        while (n > 0) {
            let newPairMap = new Map(this.pairMap);
            for (let [key, value] of this.pairMap.entries()) {
                if (value > 0) {
                    let newKey1 = key[0] + this.pairs.find((element) => element.pair == key).inserted;
                    if (!newPairMap.has(newKey1)) {
                        newPairMap.set(newKey1, value);
                    } else {
                        newPairMap.set(newKey1, newPairMap.get(newKey1) + value);
                    }

                    let newKey2 = this.pairs.find((element) => element.pair == key).inserted + key[1];
                    if (!newPairMap.has(newKey2)) {
                        newPairMap.set(newKey2, value);
                    } else {
                        newPairMap.set(newKey2, newPairMap.get(newKey2) + value);
                    }

                    newPairMap.set(key, newPairMap.get(key) - value);

                    let newElement = this.pairs.find((element) => element.pair == key).inserted;
                    if (!this.elementMap.has(newElement)) {
                        this.elementMap.set(newElement, value);
                    } else {
                        this.elementMap.set(newElement, this.elementMap.get(newElement) + value);
                    }
                }
            }
            this.pairMap = new Map(newPairMap);
            n--;
        }
        let max = -Infinity;
        let min = Infinity;
        this.elementMap.forEach((value) => {
            if (value > max) max = value;
            if (value < min) min = value;
        });
        return max - min;
    }
}

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").toString().trim().split("\n\n");

const template = input[0];
const pairs = input[1].split("\n").map((rule) => {
    let pair = rule.split(" -> ")[0];
    let inserted = rule.split(" -> ")[1];
    return { pair: pair, inserted, inserted };
});

const polymerization = new Polymerization(template, pairs);

module.exports = {
    polymerization,
};
