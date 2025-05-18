[目录](./)
# CSS请求字体跨域的问题

在 nginx.conf 中将 server 配置修改为以下形式

```
server {
        listen       8010;
        server_name  localhost;
        location / {
            root C:/Users/admin/Documents/;#根目录，可以是 alias 等
            autoindex on;       #开启nginx目录浏览功能
            autoindex_exact_size off;   #文件大小从KB开始显示
            charset utf-8;          #显示中文
			#### 下面是针对跨域的修改配置
            add_header 'Access-Control-Allow-Origin' '*'; #允许来自所有的访问地址
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, DELETE, OPTIONS'; #支持请求方式
            add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
        }

    }
```

来源：[https://blog.csdn.net/github_37847992/article/details/80240607](https://blog.csdn.net/github_37847992/article/details/80240607)