[目录](./)
# linux对jsdon的支持不友好

在 Deepin 下，在项目中直接安装 jsdom 似乎知道不到路径，不知道为什么。  
要全局安装，并且直接 `require('jsdom')`不行，要写绝对路径：
```
require("/usr/local/lib/node_modules/jsdom");
```

在 windows 下就没这些破事。

也不知道当年写 [记用nodejs转发http请求](http://m.waygc.net/blog/read/1621938679496) 这篇文章的时候，自己用的是什么操作系统。


但当时能让我用 linux 编译并测试的东西，应该不会用 windows 写的。 
也不知道到底是操作系统的问题，jsdom 的问题，还是 nodejs 的问题。
