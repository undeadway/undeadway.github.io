[目录](./)
# 解决Debian系统错误：E: Unable to locate package vim

## 现象

报如下错误

```
E: Unable to locate package vim
```

## 解决方案

把 `/etc/apt/sources.list` 里的内容，替换为

```
deb http://mirrors.163.com/debian stretch main
deb http://security.debian.org/debian-security stretch/updates main
deb http://mirrors.163.com/debian stretch-updates main
```

再执行 `apt update` 之后再安装 `apt install -y vim` 就可以了。

## 参考

* [https://blog.csdn.net/fgx_123456/article/details/107945738](https://blog.csdn.net/fgx_123456/article/details/107945738)