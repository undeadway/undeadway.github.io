[目录](./)
# publicPath

vue.config.js 中的 `publicPath` 不能写成 `./` 不然在路径跳转的时候，会有各种奇奇怪怪的错误。

[官方文档](https://cli.vuejs.org/zh/config/#publicpath)的解释是：
> 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。

说实话，我自己没看懂，实际的效果是：

> 如果在页面 `www.test.com/a` 访问 `/b` ，理论上 url 应该变成 `www.test.com/b` ，事实上变成了 `www.test.com/a/b/` 。  
> 而 如果把 `publicPath` 配置成 `/` 就不会有问题。

这个值也可以换成其他的，比如 `/r/` 这样每次请求，都会加上这个路由。