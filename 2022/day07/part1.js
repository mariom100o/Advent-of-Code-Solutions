const { inputFiles } = require("./parse");

let memo = new Map();

const getDirSize = (dir) => {
  let size = 0;
  let files = inputFiles.get(dir);

  for (let file of files) {
    if (file.type === "dir") {
      if (!memo.has(file.name)) {
        memo.set(file.name, getDirSize(file.name));
      }
      size += memo.get(file.name);
    }
    if (file.type === "file") {
      size += file.size;
    }
  }
  return size;
};

let sum = 0;
for (let dir of inputFiles.keys()) {
  let size = getDirSize(dir);
  if (size < 100000) {
    sum += size;
  }
}

console.log(sum);
