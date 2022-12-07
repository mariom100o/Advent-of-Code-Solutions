const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

let history = [];
let inputFiles = new Map();

for (let line of input) {
  if (line.includes("$ ls")) continue;
  if (line.includes("$ cd")) {
    let dirName = line.replace("$ cd ", "");
    if (dirName === "..") history.pop();
    else history.push(dirName);
  } else if (line.includes("dir")) {
    let dir = history.join("");

    dirName = dir + line.replace("dir ", "");

    let currFiles = inputFiles.get(dir) || [];
    currFiles.push({ type: "dir", name: dirName });
    inputFiles.set(dir, currFiles);
  } else {
    let dir = history.join("");
    let [size, name] = line.split(" ");
    let currFiles = inputFiles.get(dir) || [];
    currFiles.push({
      type: "file",
      name: name,
      size: parseInt(size),
    });
    inputFiles.set(dir, currFiles);
  }
}

module.exports = {
  inputFiles,
};
