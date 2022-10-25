let key = "iwrupvqb";

let i = 0;
while (true) {
  let hash = require("crypto")
    .createHash("md5")
    .update(key + i)
    .digest("hex");
  if (hash.startsWith("000000")) {
    console.log(i);
    break;
  }
  i++;
}
