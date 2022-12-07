const { happinessMap } = require("./parse");

// Insert myself to the happinessMap
let people = [];
for (let key of happinessMap.keys()) {
  happinessMap.get(key).push({ neighbor: "Me", happiness: 0 });
  people.push({ neighbor: key, happiness: 0 });
}
happinessMap.set("Me", people);

// Key to access the happinessMap regardless of order of members
const calculateKey = (person1, person2) => {
  return person1 < person2 ? `${person1}-${person2}` : `${person2}-${person1}`;
};

// Calculate hapiness of pairs
let happiness = new Map();
for (let key of happinessMap.keys()) {
  for (let member of happinessMap.get(key)) {
    let pairKey = calculateKey(key, member.neighbor);

    let neighbor = happinessMap.get(member.neighbor);
    let neighborHappiness = neighbor.find(
      (member) => member.neighbor === key
    ).happiness;
    happiness.set(pairKey, member.happiness + neighborHappiness);
  }
}

const calculateHappiness = (arr) => {
  let totalHappiness = 0;
  for (let i = 0; i < arr.length; i++) {
    let neighbor1 = arr[i];
    let neighbor2 = arr[(i + 1) % arr.length];
    if (neighbor1 === null || neighbor2 === null) continue;
    totalHappiness += happiness.get(calculateKey(neighbor1, neighbor2));
  }
  return totalHappiness;
};

const permute = (arr) => {
  let result = [];
  const permuteHelper = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permuteHelper(curr.slice(), m.concat(next));
      }
    }
  };
  permuteHelper(arr);
  return result;
};

// Get all members in an array
let seatPositions = [];
for (let key of happinessMap.keys()) {
  seatPositions.push(key);
}

let permutations = permute(seatPositions);

let maxHappiness = 0;

for (let permutation of permutations) {
  let happiness = calculateHappiness(permutation);
  maxHappiness = Math.max(maxHappiness, happiness);
}

console.log(maxHappiness);
