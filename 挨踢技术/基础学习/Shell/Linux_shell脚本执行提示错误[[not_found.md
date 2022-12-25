[目录](./)

# Linux shell脚本执行提示错误\[\[: not found

原因大概率是因为引入的 sh 是 shell 。

把第一行改成 
```
#!/bin/bash
```

就可以了。