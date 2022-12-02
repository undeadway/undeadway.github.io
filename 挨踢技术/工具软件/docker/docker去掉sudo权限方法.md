[目录](./)

# docker去掉sudo权限方法

查看用户组及成员
```
sudo cat /etc/group | grep docker
```

可以添加docker组
```
sudo groupadd docker 
```

添加用户到docker组 
```
sudo gpasswd -a ${USER} docker 
```

增加读写权限
```
sudo chmod a+rw /var/run/docker.sock
```

重启docker
```
sudo systemctl restart docker 
```

参考：[https://blog.csdn.net/jason_src/article/details/87862124](https://blog.csdn.net/jason_src/article/details/87862124)