[目录](./)

# nginx 转发

### 按请求的的平台转发到不同的域名

```
    server {
        listen  80;
        server_name waygc.net;

        if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
             rewrite / http://m.waygc.net$uri;
        }
```


### 全局转发
```
       server {
                listen     80;
                server_name tips.waygc.net;
                #charset koi8-r;

                #access_log  logs/host.access.log  main;

                # 服务器的反向代理
                rewrite ^/(.+)$ https://undeadway.github.io/ permanent;
        }

```
