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

const calcScore = (myValves, elephantValves) => {
  let score = 0;
  for (let i = 0; i < myValves.length; i++) {
    for (let j = i + 1; j < myValves.length; j++) {
      score += distanceTo(myValves[i], myValves[j]);
    }
  }
  for (let i = 0; i < elephantValves.length; i++) {
    for (let j = i + 1; j < elephantValves.length; j++) {
      score += distanceTo(elephantValves[i], elephantValves[j]);
    }
  }

  return score;
};

// It should actually just generate all possible splits and pick the best
// But this is pretty fast (~300ms)
const efficientlySplit = (contesters) => {
  let score = Infinity;
  let myValves = [];
  let elephantValves = [];

  // Just randomly generate 100,000 splits and pick the best
  for (let i = 0; i < 100000; i++) {
    let elephantValvesTest = [];
    let myValvesTest = [];
    for (let contester of contesters) {
      if (Math.random() > 0.5) myValvesTest.push(contester);
      else elephantValvesTest.push(contester);
    }
    let newScore = calcScore(myValvesTest, elephantValvesTest);
    if (newScore < score) {
      score = newScore;
      myValves = myValvesTest;
      elephantValves = elephantValvesTest;
    }
  }
  return { myValves, elephantValves };
};

let contesters = [...tunnelMap.keys()].filter(
  (valve) => tunnelMap.get(valve).flowRate > 0
);

let { myValves, elephantValves } = efficientlySplit(contesters);

let pressureReleased = 0;

pressureReleased += nextOptimalValve("AA", 26, myValves).value;
pressureReleased += nextOptimalValve("AA", 26, elephantValves).value;

console.log(pressureReleased);

console.timeEnd("ExecutionTime");
