const { input } = require("./parse");
console.time("ExecutionTime");

const MAX_COORDINATE = 4000000;

const manhattanDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const checkIfImpossible = (x, y) => {
  // If the position is outside the range of the grid, it's impossible
  if (x < 0 || x > MAX_COORDINATE || y < 0 || y > MAX_COORDINATE) return true;

  // If the position is within the range of any sensor and its beacon, it's impossible
  for (let [sensor, beacon] of input) {
    let distanceToBeacon = manhattanDistance(sensor, beacon);
    let distanceToSensor = manhattanDistance({ x, y }, sensor);
    if (distanceToBeacon >= distanceToSensor) return true;
  }
  return false;
};

const getEdges = (x, y, distance) => {
  let edges = [];

  // Push the edges of the diamond shape from the sensor and its distance
  for (let i = distance; i >= 0; i--) {
    edges.push({ x: x + i + 1, y: y - Math.abs(distance - i) });
    edges.push({ x: x - i - 1, y: y + Math.abs(distance - i) });
  }

  return edges;
};

const findHiddenBeacon = () => {
  // For every sensor, check if its edges are possible positions for the beacon
  for (let [sensor, distance] of impossibleRanges) {
    let edges = getEdges(sensor.x, sensor.y, distance);
    for (let edge of edges) if (!checkIfImpossible(edge.x, edge.y)) return edge;
  }
};

let impossibleRanges = new Map();

for (let [sensor, beacon] of input) {
  let distance = manhattanDistance(sensor, beacon);
  impossibleRanges.set(sensor, distance);
}

let hiddenBeacon = findHiddenBeacon();

console.log(hiddenBeacon.x * 4000000 + hiddenBeacon.y);

console.timeEnd("ExecutionTime");
