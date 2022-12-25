[目录](./)
# 解决Debian系统错误：E: Unable to locate package vim

把 `/etc/apt/sources.list` 里的内容，替换为

```
deb http://mirrors.163.com/debian stretch main
deb http://security.debian.org/debian-security stretch/updates main
deb http://mirrors.163.com/debian stretch-updates main
```

再执行 `apt update` 之后再安装 `apt install -y vim` 就可以了。

参考：[https://blog.csdn.net/fgx_123456/article/details/107945738?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-107945738-blog-121463921.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-107945738-blog-121463921.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1](https://blog.csdn.net/fgx_123456/article/details/107945738?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-107945738-blog-121463921.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-107945738-blog-121463921.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1)