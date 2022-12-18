const { squarePositions } = require("./parse");
console.time("ExecutionTime");

const countOpenSides = (x, y, z) => {
  let count = 6;
  if (squarePositions.has(`${x + 1},${y},${z}`)) count--;
  if (squarePositions.has(`${x - 1},${y},${z}`)) count--;
  if (squarePositions.has(`${x},${y + 1},${z}`)) count--;
  if (squarePositions.has(`${x},${y - 1},${z}`)) count--;
  if (squarePositions.has(`${x},${y},${z + 1}`)) count--;
  if (squarePositions.has(`${x},${y},${z - 1}`)) count--;

  return count;
};

let surfaceArea = 0;

for (let cube of squarePositions) {
  let [x, y, z] = cube.split(",").map((n) => parseInt(n));
  surfaceArea += countOpenSides(x, y, z);
}

console.log(surfaceArea);

console.timeEnd("ExecutionTime");
