const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((game) => {
    let sets = game.split(": ")[1];
    sets = sets.split("; ");
    return sets.map((set) => {
      let cubes = set.split(", ");
      return cubes.map((cube) => {
        let [count, color] = cube.split(" ");
        count = parseInt(count);
        return { count, color };
      });
    });
  });

module.exports = {
  input,
};
