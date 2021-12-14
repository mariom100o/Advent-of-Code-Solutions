const { input } = require("./parse");

let gammaRate = "";
let epsilonRate = "";

for (let i = 0; i < input[0].length; i++) {
    let onesCount = 0;
    for (let j = 0; j < input.length; j++) {
        if (input[j][i] == "1") onesCount++;
    }
    if (onesCount > input.length / 2) {
        gammaRate += "1";
        epsilonRate += "0";
    } else {
        gammaRate += "0";
        epsilonRate += "1";
    }
}

let gammaRateDec = parseInt(gammaRate, 2);
let epsilonRateDec = parseInt(epsilonRate, 2);

console.log(gammaRateDec * epsilonRateDec);
