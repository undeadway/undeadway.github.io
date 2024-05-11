[目录](./)
# Vue动态加载

## 前言

事情是这样的，我在给自己建立了一个写轮子的 [网站](http://codes.waygc.net/vue-wheel) 后发现，  
如果按照传统的网站开发逻辑去做，我每为那个网站添加有一个可以运行的轮子，就相当于给网站添加一个模块。

然后既然是开发模块，那就得手动修改路由、手动添加文件、手动编译，然后再重新发布整个网站才行。  
这也实在是太操蛋了……

然后想了想，既然是自己给自己造轮子，那就把轮子的所有功能都集中到一个 vue 文件中，然后动态读取这个 vue 文件不就可以了？

## 寻找和实践

有了思路，就开始搜索“Vue动态加载”这类的关键词。  
然后，就开始找到了类似 `Vue.compile` 、`Vue.component` 这样的东西，但实际试下来，全是操蛋。  
当然，更可能是因为我菜。

不是报 `Vue.compile is not function` ，就是各种报错，要么就是说 Vue 的加载是加载在全局对象上的，
编译完毕后的 Vue 对象内部没法在绑定

无奈，就只能继续寻找，然后还真就被我找到了。

代码：[https://github.com/merfais/vue-demo/](https://github.com/merfais/vue-demo/)  
演示：[https://merfais.github.io/vue-demo/#/custom-code](https://merfais.github.io/vue-demo/#/custom-code)

开始还担心会不会用不了，结果代码一下，一运行，果然和线上的演示效果一致，那就安心了。

研究了一下核心代码后，扒拉到自己的代码里，稍作修改，一运行 OK 了。

## CSS

但接下来，就又遇到了新的问题。  
因为 Vue 自带对 SASS 的支持，所以写代码的时候，很多时候会用到 SASS，但浏览器不支持啊……

所以靠上面的大佬的代码得到的 CSS 的部分，不能直接照搬，还得让 SASS 重新编译成 CSS 才行。
于是继续翻和 SASS 有关的内容。

但很可惜，从我目前得到的结果来看，SASS 似乎不支持在浏览器中进行动态编译的能力

> Sass 可以通过以下三种方式使用：作为命令行工具；作为独立的 Ruby 模块 (Ruby module)；或者作为 Rack-enabled 框架的插件（例如 Ruby on Rails 与 Merb）。无论哪种方式都需要先安装 Sass gem （Windows 系统需要先安装 Ruby）：
>```
> gem install sass
>```
> 在命令行中运行 Sass：
>```
> sass input.scss output.css
>```
> 监视单个 Sass 文件，每次修改并保存时自动编译：
>```
> sass --watch input.scss:output.css
>```
> 监视整个文件夹：
>```
>sass --watch app/sass:public/stylesheets
>```
> 更多命令的用法请通过 sass --help 获取帮助。
> 
> 在 Ruby 中使用 Sass 也非常容易，Sass gem 安装完毕后运行 require "sass" 然后按照下面的方法使用 Sass::Engine：
>```
> engine = Sass::Engine.new("#main {background-color: #0000ff}", :syntax => :scss)
> engine.render #=> "#main { background-color: #0000ff; }\n"
>```

所以这一块只能是自己在写完代码后，先往 SASS 里一丢，生成一个 css 格式的代码再说了。