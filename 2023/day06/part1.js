const { input } = require("./parse");

let [time, distance] = input;

let marginOfError = 1;

for (let race = 0; race < time.length; race++) {
  let racesWon = 0;

  let mid = Math.floor(time[race] / 2);

  // Go left
  for (let holdTime = mid; holdTime > 0; holdTime--) {
    let traveled = (time[race] - holdTime) * holdTime;
    if (traveled > distance[race]) racesWon++;
    else break;
  }
  // Go Right
  for (let holdTime = mid + 1; holdTime < time[race]; holdTime++) {
    let traveled = (time[race] - holdTime) * holdTime;
    if (traveled > distance[race]) racesWon++;
    else break;
  }

  marginOfError *= racesWon;
}

console.log(marginOfError);
