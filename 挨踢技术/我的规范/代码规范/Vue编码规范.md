[目录](./)
# Vue 编码规范

1\. 在定义 props 的时候，**严禁** 对一个变量进行多类型赋值，如：

```
export default {
    props: {
        abc: {
            type: [String, Number, Boolean], // 这里只允许定义一种数据类型
            default: ""
        }
    }
}
```
2\. 在自定义函数时，所有通过 `@` 、`v-on` 定义的函数，均以 `on` 开头，  
在函数中用到 `emit` 处理的时候，函数名中要加上 `emit` 和目标，例：

```
<input @click="onEmitDetail" />

export default {
	methods: {
		onEmitDetail() {
			this.$emit("detail");
		}
	}
}
```
