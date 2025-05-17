[目录](./)
# Deepin安装nmap

由于 nmap 只提供 rpm 包，所以如果通过 apt 命令，会提示找不到 namp 包。

```
$ sudo apt install namp
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
E: 无法定位软件包 namp
```

所以有两种其他方式安装

1. 直接在 Deepin 的资源仓库中找到对应的 deb 文件 
比如这里：
[https://mirrors.tuna.tsinghua.edu.cn/deepin/pool/main/n/nmap/](https://mirrors.tuna.tsinghua.edu.cn/deepin/pool/main/n/nmap/)

2. 源码安装

按照 nmap 官网上的办法，编译安装即可。  
[https://nmap.org/download#linux-rpm](https://nmap.org/download#linux-rpm)