const { input } = require("./parse");

const getDistance = (fly, rest, time) => {
  let traveled = 0;

  while (time > 0) {
    if (time >= fly.duration) {
      traveled += fly.speed * fly.duration;
      time -= fly.duration;
    } else {
      traveled += fly.speed * time;
      time = 0;
    }
    time -= rest;
  }

  return traveled;
};

let max = 0;
for (let reindeer of input) {
  max = Math.max(max, getDistance(reindeer.fly, reindeer.rest, 2503));
}

console.log(max);
