[目录](./)
# Vue 编码规范

1. 在定义 props 的时候，**严禁** 对一个变量进行多类型赋值，如：
```
export default {
    props: {
        abc: {
            type: [String, Number, Boolean], // 这里只允许定义一种数据类型
            default: ''
        }
    }
}
```
