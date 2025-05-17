[目录](./)
# linux对jsdom的支持不友好

在 Deepin 下，在项目中直接安装 jsdom 似乎知道不到路径，不知道为什么。  
而且除了 1.0.0 以外的版本，都会出现找不到版本的问题。

```
npm ERR! code ETARGET
npm ERR! notarget No matching version found for jsom@^20.0.0.
npm ERR! notarget In most cases you or one of your dependencies are requesting
npm ERR! notarget a package version that doesn't exist.
npm ERR! notarget 
npm ERR! notarget It was specified as a dependency of 'jsconst'
npm ERR! notarget 

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/waygc/.npm/_logs/2022-08-12T09_09_46_133Z-debug.log
```

要全局安装，并且直接 `require('jsdom')`不行，要写绝对路径：
```
require("/usr/local/lib/node_modules/jsdom");
```

在 windows 下就没这些破事。

也不知道当年写 [记用nodejs转发http请求](http://m.waygc.net/blog/read/1621938679496) 这篇文章的时候，自己用的是什么操作系统。


但当时能让我用 linux 编译并测试的东西，应该不会用 windows 写的。  
也不知道到底是操作系统的问题，jsdom 的问题，还是 nodejs 的问题。

在 centos 里测试过之后，基本可以确定是操作系统的问题。  
但 centos 又和 Deepin 不一样，报了其他的问题。

```
    at wrapSafe (internal/modules/cjs/loader.js:1054:16)
    at Module._compile (internal/modules/cjs/loader.js:1102:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
    at Module.load (internal/modules/cjs/loader.js:986:32)
    at Function.Module._load (internal/modules/cjs/loader.js:879:14)
    at Module.require (internal/modules/cjs/loader.js:1026:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/home/waygc/mytest/node_modules/jsdom/lib/jsdom/browser/parser/index.js:4:20)
    at Module._compile (internal/modules/cjs/loader.js:1138:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
```

而 deepin 虽然引入麻烦了点，但用还是可以用的，到 cantos 这里好像连用都用不了了……
