[目录](./)
# postgresql修改数据库编码

```
postgres=# update pg_database set encoding = pg_char_to_encoding('UTF8') where datname = 'your_database';
```