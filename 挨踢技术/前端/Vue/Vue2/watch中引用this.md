[目录](./)
# watch中引用this

在 `watch` 中引用 `this` ，不能用箭头函数 `() => {}` 只能用 `function`。

例子：
```
	watch: {
		"detailId": function (newVal) {
			this.getData();
		}
	}
```

与之类似，`provide` 、 中也只能用 `function` 才能引用 `this` 。  
其他运算类操作估计也一样，不再一一列举。