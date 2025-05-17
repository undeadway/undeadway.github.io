[目录](./)

# Windows下启动Apache报错：ServerRoot must be a valid directory

因为某些原因，用了下 apache，结果遇到这么个怪事

```
httpd.exe: Syntax error on line 39 of D:\Apache24\conf\httpd.conf: ServerRoot must be a valid directory
```

很奇怪，然后一查，说是 39 行的配置文件中不是我当前的配置。  
但当我把路径修改成我自己的文件路径后，还是出错……

结果只能把文件放在 C 盘根目录下，才算OK……