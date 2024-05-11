[目录](./)

# no-unknown-property

写 bug 的时候，出现了下面的错误：

```
 Unknown property 'vaule' found  react/no-unknown-property
```

对应的代码是

```
<input type="text" className={styles.inputKey} placeholder="请输入手机号" value={this.state.phone} onChange={this.handleChangePhone} />
```

一脸懵逼，只能放狗。

看了 react 的相关文档之后还是不知所云，只能继续搜索。

最后找到的结果是需要把 `value` 改成 `defaultValue` 。

于是就好了。

参考：
* [https://blog.csdn.net/Jack_lzx/article/details/118361499](https://blog.csdn.net/Jack_lzx/article/details/118361499)

# 再然后

我一开始用的是 `yarn` 安装出现的这个错误，然后我发现原来的项目自带了 `package-lock.json` ，于是我换成了 `npm install` 试试看会怎么样。

没想到直接成功。

额……………………………………………………