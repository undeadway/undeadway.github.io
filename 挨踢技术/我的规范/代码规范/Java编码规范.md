[目录](./)
# Java 编码规范

1. 在 controller 中，不允许出现逻辑代码；
2. 在 service 层方法体的最外侧，包裹一层 `try/catch`，保证所有不可控的错误都能被捕获，如：
```
public void serviceMethod() {
	try {
		// normal logic here...
	} catch (Exception e) {
		// do something....
	}
}
```
3. 所有接口名，都加上 `I` 前缀来表明这是一个接口；
4. 可以工具类化的代码，要尽量抽取为工具类；
5. 尽量少写 `if/else`、`switch/case` 这样的代码，用枚举等方式来替代；
6. 没有用到的导入包要全部删除；
7. 全面禁止使用类似 `lombok` 这样的插件；
8. 使用 `equals` 进行比较的时候，要采用 `变量.equals(常量)` 的格式来避免莫名其妙的空指针**【此项为强制规定】**；
