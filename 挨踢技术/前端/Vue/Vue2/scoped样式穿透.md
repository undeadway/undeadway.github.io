[目录](./)
# scoped样式穿透

外层组件和第三方组件之间可以用 `/deep/` 来进行穿透。’

## 编译时出现 /deep/ 错误的问题

```
Failed to compile.

./src/core/views/sign/in.vue?vue&type=style&index=0&id=15187e3f&lang=scss&scoped=true& (./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/core/views/sign/in.vue?vue&type=style&index=0&id=15187e3f&lang=scss&scoped=true&)
Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
SassError: expected selector.
    ╷
258 │     /deep/.el-checkbox__input{
    │     ^
    ╵
  /home/waygc/workspace/myproject/myproject-web/src/core/views/sign/in.vue 258:2  root stylesheet
```

## 解决方案

把 `/deep/` 改成 `::v-deep` 即可。


## 参考

* [iview - css >>> 、 /deep/ 进行样式穿透](https://blog.csdn.net/idomyway/article/details/94659598)
* [vue样式穿透 ::v-deep的具体使用](https://juejin.cn/post/6981341589763260430)