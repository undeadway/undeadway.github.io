[目录](./)
# GIT 提示 error: The requested URL returned error: 401 Unauthorized while accessing.

原因：yum install git的版本太旧，要升级到新版本（最新2.23.0）

所有命令行命令如下

```
root# yum update
root# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker
root# wget https://github.com/git/git/archive/v2.23.0.tar.gz
root# tar zxvf v2.23.0.tar.gz
root# cd git-2.23.0
root# make configure
root# ./configure --prefix=/usr/local/git --with-iconv=/usr/local/libiconv && make && make install #prefix路径你可以自定义指定和字符集
root# make && make install
root# echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/profile #添加到环境变量
username$  source /etc/profile
```