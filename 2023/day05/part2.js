const { input } = require("./parse");

let [seeds, maps] = input;

const getNewRanges = (ranges, mappingRange) => {
  let mappingStart = mappingRange.source;
  let mappingEnd = mappingStart + mappingRange.length - 1;

  let convertedRanges = [];
  for (let range of ranges) {
    let minIntersection;
    let maxIntersection;

    if (
      range.end >= mappingStart &&
      range.end <= mappingEnd &&
      range.start < mappingStart
    ) {
      minIntersection = mappingStart;
      maxIntersection = range.end;
    } else if (
      range.start >= mappingStart &&
      range.start <= mappingEnd &&
      range.end > mappingEnd
    ) {
      minIntersection = range.start;
      maxIntersection = mappingEnd;
    } else if (range.start <= mappingStart && range.end >= mappingEnd) {
      minIntersection = mappingStart;
      maxIntersection = mappingEnd;
    } else if (mappingStart <= range.start && mappingEnd >= range.end) {
      minIntersection = range.start;
      maxIntersection = range.end;
    } else {
      continue;
    }

    // Convert to new mapping
    let conversion = mappingRange.destination - mappingRange.source;
    minIntersection += conversion;
    maxIntersection += conversion;

    convertedRanges.push({ start: minIntersection, end: maxIntersection });
  }

  return convertedRanges;
};

let ranges = [];
for (let i = 1; i < seeds.length; i += 2) {
  let start = seeds[i - 1];
  let end = start + seeds[i] - 1;
  ranges.push({ start, end });
}

for (let mapping of maps) {
  let newRanges = [];
  let min = Infinity;
  let max = 0;
  for (let mappingRange of mapping.ranges) {
    let convertedRanges = getNewRanges(ranges, mappingRange);
    for (let convertedRange of convertedRanges) newRanges.push(convertedRange);

    min = Math.min(min, mappingRange.source);
    max = Math.max(max, mappingRange.source + mappingRange.length - 1);
  }
  if (min > 0) {
    let lowerBound = { destination: 0, source: 0, length: min };
    let convertedRanges = getNewRanges(ranges, lowerBound);
    for (let convertedRange of convertedRanges) newRanges.push(convertedRange);
  }

  let upperBound = { destination: max, source: max, length: Infinity };
  convertedRanges = getNewRanges(ranges, upperBound);
  for (let convertedRange of convertedRanges) newRanges.push(convertedRange);

  ranges = [...newRanges];
}

let min = Infinity;
for (let range of ranges) {
  min = Math.min(range.start, min);
}

console.log(min);
