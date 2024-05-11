[目录](./)

# centOS7下SVN的安装和使用

## 1\. 安装

CentOS通过yum安装subversion。

```
# yum install subversion
```

subversion安装在/bin目录，可以通过一下命令查看安装的位置

```
# which svnserve #查看目录命令
/usr/bin/svnserve
```

检查一下subversion是否安装成功。不要使用1.8版本

```
# svnserve --version 
svnserve, version 1.7.14 (r1542130)
```


## 2\. 建立版本库

subversion默认以/var/svn作为数据根目录，可以通过/etc/sysconfig/svnserve修改这个默认位置。

```
# vi /etc/sysconfig/svnserve
```

找到文件里的
```
 OPTIONS="-r /var/svn"
```
**可修改**。

使用svnadmin建立版本库svntest。

```
# svnadmin create /var/svn/svntest
```

## 3\. 配置

### a、编辑用户文件passwd，新增一个用户。

```
# vi conf/passwd 
```
> [users]
>
> username = admin


### b、编辑权限文件authz，用户admin设置可读写权限，guest设置只读权限。

```
# vi conf/authz 
```

> [/]
>
> username = rw
>


### c、编辑svnserve.conf：
```
# vim conf/svnserve.conf 
```

> [general]
> anon-access = none #控制非鉴权用户访问版本库的权限
> auth-access = write #控制鉴权用户访问版本库的权限
> password-db = passwd #指定用户名口令文件名
> authz-db = authz #指定权限配置文件名


## 4\. 启动SVN服务。
```
# systemctl start svnserve.service
```
检查服务是否启动成功。

```
# ps aux | grep svnroot 16349 0.0 0.1 162180 900 ? Ss 15:01 0:00 /usr/bin/svnserve --daemon --pid-file=/run/svnserve/svnserve.pid -r /opt/svn
```

或者通过netstat可以看到SVN打开了3690端口。
```
# netstat -tnlpProto Recv-Q Send-Q Local Address Foreign Address State PID/Program name tcp 0 0 0.0.0.0:3690 0.0.0.0:* LISTEN 16349/svnserve 
```

设置成开机启动。
```
# systemctl enable svnserve.service
```


## 参考
[blog.csdn.net/u010071211/article/details/79877303](blog.csdn.net/u010071211/article/details/79877303)