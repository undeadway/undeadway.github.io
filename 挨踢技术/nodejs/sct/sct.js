console.log("sct.js start");

const { exec  } = require('child_process');
let fs = require("fs");
let shellCmd = "./sct.sh ";
let _ = require("underscore");
let stdOutFile = "./sct/std-out";

shellCmd += ["index","scf","cmeditor"].join(" ");
exec(shellCmd, (err, stdout, stderr) => {
  if (err) {
    fs.writeFileSync("./sct/err", err);
    fs.writeFileSync("./sct/std-err", stderr);
  } else {
    fs.writeFileSync(stdOutFile, stdout);
  }
  console.log("sct.js done.");
});
