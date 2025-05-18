[目录](./)

# Vue打包到N级目录下

## 1. 配置 vue.config.js

```
module.exports = {
	 publicPath: process.env.VUE_APP_BASE_PATH, // 加入这么一行
}
```

## 2. 配置 router.js

```
const router = new Router({
  mode: 'hash',
  base: process.env.VUE_APP_BASE_PATH, // 加入这么一行
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
```

把 vue 的上级目录都自定义到 `VUE_APP_BASE_PATH` 这个环境变量中去。

然后重新打包就可以了。