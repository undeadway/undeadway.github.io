### 1. 下载并编译
```
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
tar xzf redis-5.0.7.tar.gz
cd cd redis-5.0.7/
make
```

然后提示下面的错误：

![](./centos-redis-make-error.png)

然后网上翻阅资料后，把 `make` 改成 `make MALLOC=libc` 就 OK 啦。  
出现这种错误可能的原因是 centos7 通过 yum 安装的 gcc 版本太低。

make完后 redis-5.0.7目录src下会出现编译后的redis服务程序redis-server，执行./redis-server就可以通过前端模式启动了，不过ssh命令窗口关闭，redis-server程序就结束了。

```
cd src
./redis-server
```

![](./centos-redis.png)

### 2. 安装到指定目录
```
# 安装到指定目录
make install PREFIX=/usr/local/redis
```

### 3. 配置环境变量

```
# 打开配置文件
vi /etc/profile
# 在文件末尾加入下面代码，:wq保存退出(无权限可:q!强制退出，换root账户重来)
export REDIS_HOME=/usr/local/redis
export PATH=$REDIS_HOME/bin:$PATH
# 使环境变量即时生效
source /etc/profile
```

### 4. 配置service启动方式

```
# 进入redis解压目录
cd ~/redis-5.0.5/utils
# 运行安装服务
./install_server.sh
# 设置端口号，默认[6379]，默认即可
# 设置配置文件地址，默认[/etc/redis/6379.conf]，我选择放到/usr/local/redis/etc/6379.conf
# 设置日志文件地址，默认[/var/log/redis_6379.log]，默认即可
# 设置数据目录（持久化），默认[/var/lib/redis/6379]，默认即可
# 设置redis可执行目录，默认[/usr/local/redis/bin/redis-server]，默认即可
# 最后回车确认

# 查看redis服务状态
service redis_6379 status
# 启动redis服务
service redis_6379 start
# 停止redis服务
service redis_6379 stop
# 重新启动redis服务
service redis_6379 restart
# 配置redis开机自动启动
chkconfig redis_6379 on
# 配置redis开机不自动启动
chkconfig redis_6379 off
```

### 5.配置systemctl启动方式

```
 将redis解压目录的redis配置文件复制过来
mkdir /usr/local/redis/etc
cp redis.conf /usr/local/redis/etc/6379.conf
# 修改配置文件支持systemctl启动方式
sed -i -e 's:^daemonize .*:daemonize yes:' -e 's:^supervised .*:supervised systemd:' /usr/local/redis/etc/6379.conf

# 添加自定义系统服务
cat > /usr/lib/systemd/system/redis_6379.service <<EOF
[Unit]
Description=Redis Server Manager
After=network.target

[Service]
Type=forking
PIDFile=/var/run/redis_6379.pid
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/etc/6379.conf
ExecReload=/bin/kill -USR2 $MAINPID
ExecStop=/bin/kill -SIGINT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

# 重新加载系统服务配置
systemctl daemon-reload

# 查看redis服务状态
systemctl status redis_6379
# 启动redis服务
systemctl start redis_6379
# 停止redis服务
systemctl stop redis_6379
# 重新启动redis服务
systemctl restart redis_6379
# 配置redis开机自动启动
systemctl enable redis_6379
# 配置redis开机不自动启动
systemctl disable redis_6379
————————————————
版权声明：本文为CSDN博主「Wenx408」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/jwx90312/article/details/104225549
```