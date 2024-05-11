[目录](./)
# postgres 创建新用户并授权

先通过 postgres 用户登录 psql。

## 1) 创建数据库新用户
```
CREATE USER 用户名 WITH PASSWORD '*****';
```

## 2）授予用户数据库权限
```
GRANT ALL PRIVILEGES ON DATABASE 数据库名 TO 用户名;
```

## 3）授予用户查看刚授权的数据库的里面的表的权限
```
GRANT ALL PRIVILEGES ON TABLE 表名  TO 用户名;
```

参考：[https://blog.csdn.net/XuHang666/article/details/81506297](https://blog.csdn.net/XuHang666/article/details/81506297)