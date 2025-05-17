因[目录](./)
# 安装不存在于npm库中的包

为工作上，要用到 swiper ，但很奇怪，在安装的时候，yarn 提示我没有 `4.5.3` 这个版本。  
开始还以为值是 yarn 上没这个包，所以用 npm 去安装还是出错。只能直接去 npmjs.com 去查看，结果还是没有。

最后在 github 上找到答案：[https://github.com/nolimits4web/swiper/issues/3324](https://github.com/nolimits4web/swiper/issues/3324)

然后解锁不知道包版本的时候安装包的方法：
```
"swiper": "https://github.com/nolimits4web/swiper/archive/v4.5.3.tar.gz",
```
