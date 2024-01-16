[目录](./)
# 编译安装nginx

从官网上下载压缩包到本地，最新的版本是[nginx-1.19.2](https://nginx.org/download/nginx-1.19.2.tar.gz)

## echo 模块
如果本地调试，推荐安装 `echo` 模块，可以看到很多信息。

参考文章：[https://www.cnblogs.com/52fhy/p/10166333.html](https://www.cnblogs.com/52fhy/p/10166333.html)

## 注意点
不过最后 `make install` 的时候需要 root 权限，否则无法向 `/usr/local/nginx` 移动文件。 