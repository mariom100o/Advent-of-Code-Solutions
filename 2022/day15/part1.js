const { input } = require("./parse");
console.time("ExecutionTime");

const Y_LEVEL = 2000000;

const manhattanDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

let impossiblePositions = new Set();
let specialPositions = new Set();

for (let [sensor, beacon] of input) {
  specialPositions.add(`${beacon.x},${beacon.y}`);
  specialPositions.add(`${sensor.x},${sensor.y}`);
}

for (let [sensor, beacon] of input) {
  let distance = manhattanDistance(sensor, beacon) + 1;

  let yDiff = Math.abs(Y_LEVEL - sensor.y);

  for (let x = 0; x <= distance - yDiff - 1; x++) {
    if (!specialPositions.has(`${sensor.x + x},${Y_LEVEL}`))
      impossiblePositions.add(`${sensor.x + x},${Y_LEVEL}`);
    if (!specialPositions.has(`${sensor.x - x},${Y_LEVEL}`))
      impossiblePositions.add(`${sensor.x - x},${Y_LEVEL}`);
  }
}

console.log(impossiblePositions.size);

console.timeEnd("ExecutionTime");
