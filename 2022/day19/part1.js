const { input } = require("./parse");
console.time("ExecutionTime");

const canAfford = (cost, ore, clay, obsidian) => {
  let oreCost = cost.find((c) => c.resource === "ore");
  let clayCost = cost.find((c) => c.resource === "clay");
  let obsidianCost = cost.find((c) => c.resource === "obsidian");

  return (
    (oreCost === undefined || oreCost.amount <= ore) &&
    (clayCost === undefined || clayCost.amount <= clay) &&
    (obsidianCost === undefined || obsidianCost.amount <= obsidian)
  );
};

const craftRobot = (
  robotCost,
  oreProduction,
  clayProduction,
  obsidianProduction,
  newTimeLeft
) => {
  let { ore, orePerSecond } = oreProduction;
  let { clay, clayPerSecond } = clayProduction;
  let { obsidian, obsidianPerSecond } = obsidianProduction;

  while (!canAfford(robotCost, ore, clay, obsidian) && newTimeLeft > 0) {
    ore += orePerSecond;
    clay += clayPerSecond;
    obsidian += obsidianPerSecond;
    newTimeLeft--;
  }
  ore += orePerSecond;
  clay += clayPerSecond;
  obsidian += obsidianPerSecond;
  newTimeLeft--;
  for (let cost of robotCost) {
    if (cost.resource === "ore") ore -= cost.amount;

    if (cost.resource === "clay") clay -= cost.amount;
    if (cost.resource === "obsidian") obsidian -= cost.amount;
  }

  return { ore, clay, obsidian, newTimeLeft };
};

const nextOptimalRobot = (
  oreProduction,
  clayProduction,
  obsidianProduction,
  geodeProduction,
  timeLeft,
  blueprint
) => {
  let geodeProduced = 0;
  for (let robot of blueprint) {
    if (robot.type === "ore" && timeLeft < 16) continue;
    if (robot.type === "clay" && timeLeft < 6) continue;
    if (robot.type === "obsidian" && timeLeft < 3) continue;
    if (robot.type === "geode" && timeLeft < 2) continue;
    let { ore, clay, obsidian, newTimeLeft } = craftRobot(
      robot.cost,
      oreProduction,
      clayProduction,
      obsidianProduction,
      timeLeft
    );
    if (newTimeLeft <= 0) {
      continue;
    }

    let newOreProduction = { ...oreProduction };
    let newClayProduction = { ...clayProduction };
    let newObsidianProduction = { ...obsidianProduction };
    let newGeodeProduction = { ...geodeProduction };
    if (robot.type === "ore") newOreProduction.orePerSecond++;
    if (robot.type === "clay") newClayProduction.clayPerSecond++;
    if (robot.type === "obsidian") newObsidianProduction.obsidianPerSecond++;
    if (robot.type === "geode") newGeodeProduction.geodePerSecond++;
    newOreProduction.ore = ore;
    newClayProduction.clay = clay;
    newObsidianProduction.obsidian = obsidian;
    let score = robot.type === "geode" ? newTimeLeft : 0;

    score += nextOptimalRobot(
      newOreProduction,
      newClayProduction,
      newObsidianProduction,
      newGeodeProduction,
      newTimeLeft,
      blueprint
    );

    if (score > geodeProduced) {
      geodeProduced = score;
    }
  }
  return geodeProduced;
};
let qualitySum = 0;
let i = 1;
for (let blueprint of input) {
  let score = nextOptimalRobot(
    { ore: 0, orePerSecond: 1 },
    { clay: 0, clayPerSecond: 0 },
    { obsidian: 0, obsidianPerSecond: 0 },
    { geode: 0, geodePerSecond: 0 },
    24,
    blueprint
  );
  qualitySum += score * i++;
}
console.log(qualitySum);

console.timeEnd("ExecutionTime");
