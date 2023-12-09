// TODO: Incomplete
const { input } = require("./parse");
console.time("ExecutionTime");

const start = { x: 0, y: 0 };
const end = { x: input[0].length - 1, y: input.length - 1 };

let leastRiskyPath = input.map((row) => row.map(() => Infinity));
leastRiskyPath[end.y][end.x] = input[end.y][end.x];

let visited = input.map((row) => row.map(() => false));

const queue = [end];

while (queue.length > 0) {
    const current = queue.shift();

    let neighbors = [
        { x: current.x - 1, y: current.y },
        { x: current.x + 1, y: current.y },
        { x: current.x, y: current.y - 1 },
        { x: current.x, y: current.y + 1 },
    ];

    neighbors = neighbors.filter((neighbor) => input[neighbor.y]?.[neighbor.x] !== undefined);

    for (let neighbor of neighbors) {
        let neighborRisk = leastRiskyPath[neighbor.y][neighbor.x];
        let pointRisk = input[current.y][current.x];

        leastRiskyPath[current.y][current.x] = Math.min(leastRiskyPath[current.y][current.x], neighborRisk + pointRisk);

        if (!visited[neighbor.y][neighbor.x]) {
            queue.push(neighbor);
            visited[neighbor.y][neighbor.x] = true;
        }
    }
}

console.log(leastRiskyPath[start.y][start.x] - input[start.y][start.x]);

console.timeEnd("ExecutionTime");
