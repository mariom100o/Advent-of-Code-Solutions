const { input } = require("./parse");

let [seeds, maps] = input;

let min = Infinity;

for (let seed of seeds) {
  let mapping = seed;

  for (let map of maps) {
    for (let range of map.ranges) {
      // If this is our range, update mapping
      if (mapping >= range.source && mapping <= range.source + range.length) {
        let dist = mapping - range.source;
        mapping = range.destination + dist;
        break;
      }
    }
  }

  min = Math.min(min, mapping);
}

console.log(min);
