// TODO: Incomplete
const { input } = require("./parse");
console.time("ExecutionTime");

const extendWidth = (arr, extendCount) => {
    for (let count = 0; count < extendCount; count++) {
        for (let i = 0; i < input.length; i++) {
            let newRow = [];
            for (let num of input[i]) newRow.push(((num + count) % 9) + 1);
            arr[i].push(...newRow);
        }
    }
};

const extendHeight = (arr, extendCount) => {
    let original = arr.map((row) => [...row]);

    for (let count = 0; count < extendCount; count++) {
        for (let row of original) {
            let newRow = [];
            for (let num of row) newRow.push(((num + count) % 9) + 1);
            arr.push([...newRow]);
        }
    }
};

let extendedInput = input.map((row) => [...row]);

extendWidth(extendedInput, 4);
extendHeight(extendedInput, 4);

const start = { x: 0, y: 0 };
const end = { x: extendedInput[0].length - 1, y: extendedInput.length - 1 };

let leastRiskyPath = extendedInput.map((row) => row.map(() => Infinity));
leastRiskyPath[end.y][end.x] = extendedInput[end.y][end.x];

let visited = extendedInput.map((row) => row.map(() => false));

const queue = [end];

while (queue.length > 0) {
    const current = queue.shift();

    let neighbors = [
        { x: current.x - 1, y: current.y },
        { x: current.x + 1, y: current.y },
        { x: current.x, y: current.y - 1 },
        { x: current.x, y: current.y + 1 },
    ];

    neighbors = neighbors.filter((neighbor) => extendedInput[neighbor.y]?.[neighbor.x] !== undefined);

    for (let neighbor of neighbors) {
        let neighborRisk = leastRiskyPath[neighbor.y][neighbor.x];
        let pointRisk = extendedInput[current.y][current.x];

        leastRiskyPath[current.y][current.x] = Math.min(leastRiskyPath[current.y][current.x], neighborRisk + pointRisk);

        if (!visited[neighbor.y][neighbor.x]) {
            queue.push(neighbor);
            visited[neighbor.y][neighbor.x] = true;
        }
    }
}

console.log(start, end);

console.log(leastRiskyPath[start.y][start.x] - extendedInput[start.y][start.x]);

console.timeEnd("ExecutionTime");
