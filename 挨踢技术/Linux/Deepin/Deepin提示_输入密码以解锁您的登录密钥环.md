[目录](./)
# Deepin提示“输入密码以解锁您的登录密钥环”

刷脸登录时提示“输入密码以解锁您的登录密钥环”

![](./kerings.png)

只要执行一下命令后重启就可以了
```
rm -rf ~/.local/share/keyrings/*
```