[目录](./)

# Deepin安装webbench

```
#下载
wget http://home.tiscali.cz/~cz210552/distfiles/webbench-1.5.tar.gz
#解压
tar -zxvf ./webbench-1.5.tar.gz
#安装编译环境
sudo apt-get update
sudo apt-get install -y gcc ctags
编译
cd webbench-1.5
sudo make # 这里可能会报错，原因待调查
sudo make install
测试
webbench -t 60 -c 100 http://www.baidu.com/
```