[目录](./)
# vue-meta

Vue 可以用 `vue-meta` 来动态设置 html 页面的 header 中的信息。

只要在 vue 文件里写类似下面的代码就可以了。
```
<script>
export default {
	metaInfo: {
		htmlAttrs: {
			lang: "cn"
		},
		title: process.env.VUE_APP_TITLE,
		meta: [
			{ name: "referrer", content: "never" }
		]
	}
}
</script>
```

但  `vue-meta` 是在页面加载后才生效的，所以最开始打包完之后就有的 `Vue App` 在页面资源全部加载完成前都一直会在。