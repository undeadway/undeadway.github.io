[目录](./)
# PG 提示 SQL 错误 [42501]: ERROR: permission denied for relation 的问题

从文字描述来看是权限问题。

一般情况下，是因为数据库权限已经给了用户，但是表权限没有给用户导致。  
所以只要把表权限加给用户即可。

```
alter table public.tbl_name owner to 用户名;
```