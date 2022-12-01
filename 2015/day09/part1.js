const { flightMap } = require("./parse");

const cities = [...flightMap.keys()];

const shortestPath = (city, traveled, [...visited]) => {
  if (visited.includes(city)) return Infinity;
  visited.push(city);

  let min = Infinity;
  for (let { to, distance } of flightMap.get(city)) {
    min = Math.min(min, shortestPath(to, distance, visited));
  }

  if (min === Infinity) return traveled;

  return min + traveled;
};

let min = Infinity;
for (let city of cities) {
  min = Math.min(min, shortestPath(city, 0, []));
}

console.log(min);
