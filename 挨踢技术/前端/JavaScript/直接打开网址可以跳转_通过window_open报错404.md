[目录](./)
# 直接打开网址可以跳转，通过window.open报错404

### 遇到的问题

我在项目上用window.open报错404，但是在浏览器直接访问地址却可以访问到。

### 可能的问题原因

从浏览器直接输入是没有referer的，从项目里跳转会带上项目的地址作为referer
所以可能要跳转的服务器对referer进行了拦截。

### 解决方案
```
windowOpen(url) {
	window.open('javascript:window.name;', `<script>location.replace('${url}')<\/script>`);
}
```