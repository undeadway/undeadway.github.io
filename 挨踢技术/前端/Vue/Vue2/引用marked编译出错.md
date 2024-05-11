[目录](./)

# 引用marked编译出错

## 现象
Vue2 直接 `import marked from "marked"` 到工程中后，会报下面的编译错误

```
 ERROR  Failed to compile with 1 error                                              11:19:00

 error  in ./node_modules/marked/lib/marked.umd.js

Module parse failed: Unexpected token (253:15)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|      */
|     class _Tokenizer {
>         options;
|         // TODO: Fix this rules type
|         rules;

 @ ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/about/versions.vue?vue&type=script&lang=js 8:37-54
 @ ./src/views/about/versions.vue?vue&type=script&lang=js
 @ ./src/views/about/versions.vue
 @ ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/about/index.vue?vue&type=script&lang=js
 @ ./src/views/about/index.vue?vue&type=script&lang=js
 @ ./src/views/about/index.vue
 @ ./src/router/routers.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?https://192.168.100.121:8082&sockPath=/sockjs-node (webpack)/hot/dev-server.js ./src/main.js
```

## 解决方案

在 `vue.config.js` 中添加下面这行代码就可以了。

```
module.exports = {
  transpileDependencies: ["marked"], // 这里
}
```

## 参考

* [https://www.cnblogs.com/guohao520/p/18024496](https://www.cnblogs.com/guohao520/p/18024496)
* [https://cli.vuejs.org/config/#transpiledependencies](https://cli.vuejs.org/config/#transpiledependencies)