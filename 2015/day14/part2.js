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

for (let i = 1; i <= 2503; i++) {
  let max = 0;
  for (let reindeer of input) {
    let distance = getDistance(reindeer.fly, reindeer.rest, i);
    max = Math.max(max, distance);
    reindeer.distance = distance;
  }

  for (let reindeer of input) {
    if (reindeer.distance === max) reindeer.points++;
  }
}

for (let reindeer of input) {
  console.log(reindeer.name, reindeer.points);
}
