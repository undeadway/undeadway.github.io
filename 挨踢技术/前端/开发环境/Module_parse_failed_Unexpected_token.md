[目录](./)
# Module parse failed: Unexpected token

今天用 `marked` 写 bug 的时候，启动 vue-cli-service 的时候，出现了这么个错误。

```
 ERROR  Failed to compile with 1 error                                                                                                                                                                                                                                                                           16:46:55

 error  in ./node_modules/marked/lib/marked.umd.js

Module parse failed: Unexpected token (253:15)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|      */
|     class _Tokenizer {
>         options;
|         // TODO: Fix this rules type
|         rules;

 @ ./src/main.js 6:37-54
 @ multi (webpack)-dev-server/client?https://192.168.100.121:8080&sockPath=/sockjs-node (webpack)/hot/dev-server.js ./src/main.js
 
```

报错的意思很明确，语法错误。  
但导包的时候哪来的语法错误？

然后查了一下，发现可能是某些新语法 webpack 不支持，所以需要在 vue.config.js 里加入这么一行代码就可以了。

```
module.exports = {
  transpileDependencies: ["marked"],
}
```

重启 vue-cli-service 就 OK 了。

## 参考

* [https://blog.csdn.net/ejunda/article/details/133862943](https://blog.csdn.net/ejunda/article/details/133862943)