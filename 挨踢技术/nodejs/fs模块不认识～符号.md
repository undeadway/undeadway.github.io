[目录](./)
# fs模块不认识`~`符号

在用 fs 模块的时候，写过一下代码：

```
const fs = require("fs");

fs.accessSync("~")
```

但系统却给了我这么一串错误提示：
```
Uncaught Error: ENOENT: no such file or directory, access '~'
    at Object.accessSync (fs.js:204:3) {
    errno: -2,
    syscall: 'access',
    code: 'ENOENT',
    path: '~'
}
```

而如果将 `~` 换成 `/home` 之类的，就没有问题。

看来 nodejs 的 fs 模块，不认 `~` 符号。