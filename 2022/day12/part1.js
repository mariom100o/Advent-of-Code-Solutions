const { input } = require("./parse");

let heightMap = input.heightMap;

let endPos = input.endPos;
let startPos = input.startPos;

let visited = heightMap.map((line) => line.map(() => false));
let shortestPaths = heightMap.map((line) => line.map(() => Infinity));
shortestPaths[endPos.y][endPos.x] = 0;

let queue = [endPos];

while (queue.length > 0) {
  let pos = queue.shift();
  visited[pos.y][pos.x] = true;

  let neighbours = [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
  ];

  neighbours = neighbours.filter((neighbour) => {
    return heightMap[neighbour.y]?.[neighbour.x] !== undefined;
  });

  neighbours.forEach((neighbour) => {
    let currHeight = heightMap[pos.y][pos.x];
    let nextHeight = heightMap[neighbour.y][neighbour.x];
    if (currHeight >= nextHeight - 1) {
      let shortestDist = shortestPaths[neighbour.y][neighbour.x] + 1;
      let currShortestDist = shortestPaths[pos.y][pos.x];
      shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
    }

    if (!visited[neighbour.y][neighbour.x] && currHeight <= nextHeight + 1) {
      queue.push(neighbour);
      visited[neighbour.y][neighbour.x] = true;
    }
  });
}

console.log(shortestPaths[startPos.y][startPos.x]);
