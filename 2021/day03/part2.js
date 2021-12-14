const { input } = require("./parse");

let O2GenRating = input;
let CO2ScrubRating = input;

let i = 0;
while (O2GenRating.length > 1) {
    let onesCount = 0;
    for (let j = 0; j < O2GenRating.length; j++) {
        if (O2GenRating[j][i] == "1") onesCount++;
    }

    if (onesCount >= O2GenRating.length / 2) {
        O2GenRating = O2GenRating.filter((num) => num[i] == "1");
    } else {
        O2GenRating = O2GenRating.filter((num) => num[i] == "0");
    }

    i++;
}

i = 0;
while (CO2ScrubRating.length > 1) {
    let onesCount = 0;
    for (let j = 0; j < CO2ScrubRating.length; j++) {
        if (CO2ScrubRating[j][i] == "1") onesCount++;
    }

    if (onesCount >= CO2ScrubRating.length / 2) {
        CO2ScrubRating = CO2ScrubRating.filter((num) => num[i] == "0");
    } else {
        CO2ScrubRating = CO2ScrubRating.filter((num) => num[i] == "1");
    }

    i++;
}

let O2GenRatingDec = parseInt(O2GenRating, 2);
let CO2ScrubRatingDec = parseInt(CO2ScrubRating, 2);

console.log(O2GenRatingDec * CO2ScrubRatingDec);
