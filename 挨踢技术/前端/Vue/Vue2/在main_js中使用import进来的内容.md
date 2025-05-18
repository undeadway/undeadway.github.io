[目录](./)

# 在main.js中使用import进来的内容

在 main.js 中，用 import 进来，可以预处理一些内容，  
但如果下文直接使用 import 进来的内容，会得到 undefined 。

所以这里需要做一些中间处理。

```
import some from "./views/" // 比如我把所有组件导入了进来

console.log(some); // some = undefined
const other = some; 
console.log(other.Compo1); // 这时 other 就可以用了
```