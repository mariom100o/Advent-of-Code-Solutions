const { flightMap } = require("./parse");

const cities = [...flightMap.keys()];

const longestPath = (city, traveled, [...visited]) => {
  if (visited.includes(city)) return -1;
  visited.push(city);

  let max = -1;
  for (let { to, distance } of flightMap.get(city)) {
    max = Math.max(max, longestPath(to, distance, visited));
  }

  if (max === -1) return traveled;

  return max + traveled;
};

let max = -1;
for (let city of cities) {
  max = Math.max(max, longestPath(city, 0, []));
}

console.log(max);
