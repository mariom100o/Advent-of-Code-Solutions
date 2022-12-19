const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" ");
    let robotCosts = [];
    // Ore robot
    let type = split[3];
    let resource = split[7].slice(0, -1);
    let amount = parseInt(split[6]);
    let cost = [{ resource, amount }];
    robotCosts.push({ type, cost });
    // Clay robot
    type = split[9];
    resource = split[13].slice(0, -1);
    amount = parseInt(split[12]);
    cost = [{ resource, amount }];
    robotCosts.push({ type, cost });
    // Obsidian robot
    type = split[15];
    let resource1 = split[19];
    let amount1 = parseInt(split[18]);
    let resource2 = split[22].slice(0, -1);
    let amount2 = parseInt(split[21]);
    cost = [
      { resource: resource1, amount: amount1 },
      { resource: resource2, amount: amount2 },
    ];
    robotCosts.push({ type, cost });
    // Geode robot
    type = split[24];
    resource1 = split[28];
    amount1 = parseInt(split[27]);
    resource2 = split[31].slice(0, -1);
    amount2 = parseInt(split[30]);
    cost = [
      { resource: resource1, amount: amount1 },
      { resource: resource2, amount: amount2 },
    ];
    robotCosts.push({ type, cost });

    return robotCosts;
  });

module.exports = {
  input,
};
