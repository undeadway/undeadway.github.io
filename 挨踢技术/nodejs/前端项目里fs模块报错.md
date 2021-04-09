前端项目里require了fs模块，但是一直报错：

> fs.readdirSync is not a function

代码如下：
```
var fs = require('fs');
var dir = fs.readdirSync("./script"); // 这里出错
for (var i = 0, len = dir.length; i < len; i++) {
	require(`./script/${dir[i]}`);
}
```

结合我上述代码的作用是读取本地文件夹，并且用在前端的逻辑来看，  
**猜测**应该是前端环境没有 fs 模块导致的错误。

所以这里只能放弃这种通过代码读取文件夹直接加载模块的方式，  
改用手动一个个模块的导入。

如果使用 webpack ，则可以借用 webpack 的 require.context 函数进行自动挂载文件
```
	const base = require.context("./base/.");
	base.keys().forEach(key => {
		base(key);
	});
	const _lib = require.context("./lib/.");
	_lib.keys().forEach(key => {
		/^\.\/(((?!\.js).)+)?(.js)?$/.test(key);
		if (!lib[RegExp.$1]) {
			lib[key.replace("./", "")] = _lib(key);
		}
	});
```