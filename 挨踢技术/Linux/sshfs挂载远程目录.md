[目录](./)
# sshfs挂载远程目录

首先安装 sshfs

```
sudo apt install sshfs
```

安装完毕后，执行挂载
```
sshfs 远程用户@远程IP:/远程目录 /本地想要挂载的目录
```

网上说仔 `/etc/fstab` 中进行如下配置后，就可以开机自动挂载，但实际尝试后无效，不知道为什么。

```
sshfs#@远程IP:/远程目录 /本地想要挂载的目录 fuse.sshfs defaults 0 0
```

待查。

## 脚本
```
#!/usr/bin/expect
set timeout 30
spawn  -ignore HUP sshfs 远程用户@远程IP:/远程目录 /本地想要挂载的目录 -p 22
expect "*password:"
send "你的密码"
interact
```