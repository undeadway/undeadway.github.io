[目录](./)
# watch中引用this

在 watch 中引用 this ，不能用箭头函数 `() => {}` 只能用 `function`。

例子：
```
	watch: {
		"detailId": function (newVal) {
			this.getData();
		}
	}
```