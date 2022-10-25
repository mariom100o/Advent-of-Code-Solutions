const { wireMap } = require("./parse");

const memo = new Map();

const getSignal = (wire) => {
  console.log(wireMap.get(wire));
  let action = wireMap.get(wire).action;
  let from = wireMap.get(wire).from;

  if (action === "assign") return intOrSignal(from);
  else if (action === "NOT") {
    return 65536 + ~intOrSignal(from);
  } else if (action === "AND")
    return intOrSignal(from.wire1) & intOrSignal(from.wire2);
  else if (action === "OR")
    return intOrSignal(from.wire1) | intOrSignal(from.wire2);
  else if (action === "LSHIFT")
    return intOrSignal(from.wire1) << intOrSignal(from.wire2);
  else if (action === "RSHIFT")
    return intOrSignal(from.wire1) >> intOrSignal(from.wire2);
};

const intOrSignal = (value) => {
  if (Number.isInteger(parseInt(value))) {
    return parseInt(value);
  } else {
    return getSignalMemo(value);
  }
};

const getSignalMemo = (wire) => {
  if (memo.has(wire)) return memo.get(wire);
  let signal = getSignal(wire);
  memo.set(wire, signal);
  return signal;
};

console.log(getSignal("a"));
