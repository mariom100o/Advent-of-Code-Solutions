let sequence = "1113222113";

for (let i = 0; i < 50; i++) {
  let newSequence = "";
  while (sequence.length > 0) {
    let char = sequence[0];
    let count = 1;
    while (sequence[count] === char) {
      count++;
    }
    newSequence += count + char;
    sequence = sequence.slice(count);
  }
  sequence = newSequence;
}

console.log(sequence.length);
