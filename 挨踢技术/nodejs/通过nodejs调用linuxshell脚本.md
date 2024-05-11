[目录](./)
# 通过 nodejs 调用 linux shell 脚本

### JS 代码

```
console.log("sct.js start");

const { exec } = require('child_process');
const fs = require("fs");
const shellCmd = "./sct.sh ";
const stdOutFile = "./sct/std-out";

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
```

### Shell 代码

```
npm run sct-"$1"
echo "sct-$1 done"
npm run sct-"$2"
echo "sct-$2 done"
npm run sct-"$3"
echo "sct-$3 done"
```