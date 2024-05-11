[目录](./)
# Deepin安装wireshark

在应用商店里下载可能无法运行，因此直接使用apt来下载WireShark。
apt下载wireshark：
```
sudo apt install wireshark
```

安装完成后打开会提示权限不足，添加权限：
```
sudo chmod 775 /usr/bin/dumpcap
```

参考：[https://blog.csdn.net/qq_42893430/article/details/114744017](https://blog.csdn.net/qq_42893430/article/details/114744017)