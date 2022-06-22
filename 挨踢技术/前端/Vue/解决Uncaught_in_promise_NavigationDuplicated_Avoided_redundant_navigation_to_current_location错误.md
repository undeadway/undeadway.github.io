[目录](./)
# 解决Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/" 错误

![](./Uncaught_navigation_to_current_location.png)

vue router路由重复触发导致的报错，只要把 push 或者 replace 给覆盖掉就可以了。

例：
```
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = (location, onComplete, onAbort) => {
	if (onComplete === undefined && onAbort === undefined) {
		return originReplace.call(this, location, onComplete, onAbort).catch(() => {});
	} else {
		originReplace.call(this, location, onComplete, onAbort);
	}
};
```