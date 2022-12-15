const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" ");
    let sensorX = parseInt(split[2].substring(2).slice(0, -1));
    let sensorY = parseInt(split[3].substring(2).slice(0, -1));

    let beaconX = parseInt(split[8].substring(2).slice(0, -1));
    let beaconY = parseInt(split[9].substring(2));

    return [
      { x: sensorX, y: sensorY },
      { x: beaconX, y: beaconY },
    ];
  });

module.exports = {
  input,
};
