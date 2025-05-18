[目录](./)
# CentOS停止维护的影响

最主要的问题就是 yum 用不了了，得修改地址。

解决：
>修改 /etc/yum.repos.d/CentOS-Base.repo，CentOS-AppStream.repo，CentOS-Extras.repo
>修改如下：
>注释mirrorlist，把baseurl取消注释并修改为阿里云镜像地址

CentOS-Base.repo：
```
# CentOS-Base.repo
[BaseOS]
name=CentOS-$releasever - Base
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=BaseOS&infra=$infra
#baseurl=http://mirror.centos.org/$contentdir/$releasever/BaseOS/$basearch/os/
baseurl=https://mirrors.aliyun.com/centos/$releasever-stream/BaseOS/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```

CentOS-AppStream.repo：
```
# CentOS-AppStream.repo
[AppStream]
name=CentOS-$releasever - AppStream
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=AppStream&infra=$infra
#baseurl=http://mirror.centos.org/$contentdir/$releasever/AppStream/$basearch/os/
baseurl=https://mirrors.aliyun.com/centos/$releasever-stream/AppStream/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```

CentOS-Extras.repo：
```
# CentOS-Extras.repo
[extras]
name=CentOS-$releasever - Extras
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras&infra=$infra
#baseurl=http://mirror.centos.org/$contentdir/$releasever/extras/$basearch/os/
baseurl=https://mirrors.aliyun.com/centos/$releasever-stream/extras/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```

># 清除所有缓存文件
>yum clean all
>
># 制作元数据缓存
>yum makecache

[原文链接](https://blog.csdn.net/lisongyue123/article/details/110822915)