const { input } = require("./parse");
console.time("ExecutionTime");

input.forEach((item) => (item.num *= 811589153));

const insert = (arr, index, item) => {
  arr.splice(index, 0, item);
};

const remove = (arr, index) => {
  let idx = mixed.indexOf(mixed.find((item) => item.idx === index));
  arr.splice(idx, 1);
};

let mixed = [...input];
for (let count = 0; count < 10; count++) {
  for (let i = 0; i < input.length; i++) {
    let num = input[i].num;
    let idx = mixed.indexOf(input[i]);
    let newIdx = idx;
    if (num > 0) num %= mixed.length - 1;
    if (num < 0) num = ((num * -1) % (mixed.length - 1)) * -1;
    while (num > 0) {
      if (newIdx == mixed.length - 1) newIdx = 0;
      newIdx++;
      num--;
    }
    while (num < 0) {
      if (newIdx == 0) newIdx = mixed.length - 1;
      newIdx--;
      num++;
    }
    remove(mixed, input[i].idx);

    insert(mixed, newIdx, input[i]);
  }
}

let idxOf0 = mixed.indexOf(mixed.find((item) => item.num === 0));

let sum = 0;
for (let i = 1000; i <= 3000; i += 1000) {
  let groveCoordinate = (i + idxOf0) % mixed.length;
  sum += mixed[groveCoordinate].num;
}

console.log(sum);

console.timeEnd("ExecutionTime");
