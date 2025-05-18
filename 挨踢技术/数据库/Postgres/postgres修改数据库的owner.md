[目录](./)
# postgres修改数据库的owner

```
postgres=# alter database 数据库名 owner to 用户名 
```

赋予用户某个数据库的所有权限：
```
grant all privileges on database 数据库名 to 用户名 
```