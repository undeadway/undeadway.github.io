[目录](./)
# nginx匹配问号的问题

写ngx 的正则表达式的时候，遇到一个问题

`~ /(user|client)/(.+)/$` 无法匹配 `/client/list?id=2` 。

配置里写的 `/$1/$2`， 预期输出 `/client/list?id=2` 实际输出 `/client/list`

查阅资料后发现，`?id=2` 的部分在 ngx 中专门被 `$query_string` 所匹配  
所以将 ngx 的配置修改为 `/$1/$2?$query_string` 就可以了


## 参考
* [https://blog.csdn.net/yongcto/article/details/11815427](https://blog.csdn.net/yongcto/article/details/11815427)