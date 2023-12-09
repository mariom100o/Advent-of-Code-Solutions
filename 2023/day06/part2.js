const { input } = require("./parse");

let [time, distance] = input;

let trueTime = "";
for (let splitTime of time) trueTime += splitTime;
trueTime = parseInt(trueTime);

let trueDistance = "";
for (let splitDistance of distance) trueDistance += splitDistance;
trueDistance = parseInt(trueDistance);

let marginOfError = 1;

let racesWon = 0;

let mid = Math.floor(trueTime / 2);

// Go left
for (let holdTime = mid; holdTime > 0; holdTime--) {
  let traveled = (trueTime - holdTime) * holdTime;
  if (traveled > trueDistance) racesWon++;
  else break;
}
// Go Right
for (let holdTime = mid + 1; holdTime < trueTime; holdTime++) {
  let traveled = (trueTime - holdTime) * holdTime;
  if (traveled > trueDistance) racesWon++;
  else break;
}

marginOfError *= racesWon;

console.log(marginOfError);
