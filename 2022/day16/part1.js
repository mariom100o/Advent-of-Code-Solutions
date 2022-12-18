const { tunnelMap } = require("./parse");
console.time("ExecutionTime");

const distanceMemo = new Map();

const distanceMemoKey = (currValve, targetValve) => {
  return currValve < targetValve
    ? currValve + targetValve
    : targetValve + currValve;
};

const nextOptimalValve = (currValve, timeLeft, contesters) => {
  let optimalValve = null;
  let value = 0;

  for (let contester of contesters) {
    let newContesters = [...contesters].filter((v) => v !== contester);
    let newTime = timeLeft - distanceTo(currValve, contester) - 1;
    if (newTime <= 0) continue;
    let score = newTime * tunnelMap.get(contester).flowRate;
    let optimal = nextOptimalValve(contester, newTime, newContesters);
    score += optimal.value;

    if (score > value) {
      optimalValve = contester;
      value = score;
    }
  }

  return { optimalValve, value };
};

const distanceTo = (currValve, targetValve) => {
  let key = distanceMemoKey(currValve, targetValve);
  if (distanceMemo.has(key)) return distanceMemo.get(key);
  let visisted = new Set();
  let queue = [currValve];
  let traveled = 0;

  while (queue.length > 0) {
    let nextQueue = [];
    for (let valve of queue) {
      if (visisted.has(valve)) continue;
      visisted.add(valve);
      if (valve === targetValve) {
        distanceMemo.set(key, traveled);
        return traveled;
      }
      for (let neighbor of tunnelMap.get(valve).neighbors) {
        nextQueue.push(neighbor);
      }
    }
    queue = nextQueue;
    traveled++;
  }
};

let contesters = [...tunnelMap.keys()].filter(
  (valve) => tunnelMap.get(valve).flowRate > 0
);

console.log(nextOptimalValve("AA", 30, contesters).value);

console.timeEnd("ExecutionTime");
