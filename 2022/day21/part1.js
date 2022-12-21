const { monkeyMap } = require("./parse");
console.time("ExecutionTime");

const evaluate = (monkey) => {
  let job = monkeyMap.get(monkey);

  if (job.type === "number") return job.number;

  let operand1 = evaluate(job.operand1);
  let operand2 = evaluate(job.operand2);

  if (job.operator === "+") return operand1 + operand2;
  if (job.operator === "-") return operand1 - operand2;
  if (job.operator === "*") return operand1 * operand2;
  if (job.operator === "/") return operand1 / operand2;
};

console.log(evaluate("root"));

console.timeEnd("ExecutionTime");
