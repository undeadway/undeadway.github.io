[目录](./)
# 安装docker

### 安装 docker

```
sudo wget -qO- https://get.docker.com/ | bash
```

### docker 命令免 sudo

1. 创建一个docker组
```
$ sudo groupadd docker
```
 
2. 添加当前用户到docker组
```
$ sudo usermod -aG docker $USER
```
 
3. 登出，重新登录 shell

### docker 开机自启动

```
sudo systemctl enable docker
```