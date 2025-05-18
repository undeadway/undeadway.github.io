[目录](./)
# Vue动态组件

众所周知，我写过一个 Vue2 的前端框架 [modell-vue2-frame](https://tech-demo.waygc.net/vue2-frame/) 。

然后，在撸自己博客的时候发现，自己在 table 的时候，有了一点小问题。

主要的问题是，之前为了简化代码，不想在 `<Mv2Table></Mv2Table>` 中写太多的 `<slot>` 。  
所以，在写框架的时候，把对单元格的处理，放在了 column 的定义中。

```
data () {
	return {
		columns: [
			{
				text: "姓名",
				name: "name",
			},
			{
				text: "联系方式",
				name: "phone",
			},
			{
				text: "地址",
				name: "address"
			},
			{
				text: "操作",
				name: "event",
				format: function (data) {
					return `<button>操作</button>`;
				}
			}
		]
	}
}
```

然后发现，编译完之后的代码，只能写 html ，甚至不能写我自己的 Mv2 组件……

于是，开始了第一步升级。

最开始的时候，使用的是 之前体验过的 [Vue动态加载](./Vue动态加载) 技术。  
然后我就可以开心地使用 vue 组件了。

但马上发现了第二个问题：动态加载不支持 SASS 啊！  
而且要写 js 也特别麻烦……

再找新的方法，于是找到了 vue 的动态组件。
虽然之前查找动态加载的时候，发现过 `Vue.component` 这个东西，但当时不知道为啥没好使。

这次发现，这东西还能这么写代码

```
<component :is="component"></component>
```

然后悲催的发现，之前别人的动态加载也用的 `<component>` ……

不过，既然发现了 `<component>` ，于是就开始改造升级！

首先，就是把要用到的组件 import 进来

```
import compA from "./componets/comp-a";
```

然后引用
```
<component :is="compA"></component>
```

就 OK 了~  
没了，就这么简单。  
中间也可以通过 props 等传递给子组件。

但 这里的 is ，必须是个组件，而不是能简单的 字符串。  
所以之前用过的动态加载我也没丢，让它承载字符串模板就可以了~