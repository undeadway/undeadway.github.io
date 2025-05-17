[目录](./)
# postgres 使用 union 查询时的一个小坑

众所周知（或许并不），视图（view）是个好东西。很多时候因为表关联太多，导致sql巨复杂，而让前端程序要求对sql的理解程度会很高。而这个时候，如果将某些逻辑抽取成一个视图，那整个sql的复杂度一下子就降了下来。  
可以说，视图就是数据库的面向接口编程——我不需要知道你的实现，只要知道你最后能给我什么。

但有些时候，视图也不是这么美好。  
比如，有两张表，所要表示的数据和结构都非常相似，就差了一两个字段，至于为什么要分成两张表，那就先别管了。可以理解为一份数据的两种表达形式。

```
create table t_val_n (
    id serial PRIMARY KEY,
    nname varchar(50) unique not null,
    type varchar(50) not null, -- 用于搜索
    type_s varchar(50) not null, -- 用于显示
    comments text no null);create table t_val_p (
    id serial PRIMARY KEY,
    pname varchar(50) unique not null,    field varchar(50) not null,
    comments text no null);
```

但因为这两组数据经常会被同一个条件所引用查询，所以经常会写出类似下面的sql

```
select * from t_val_n where type = 'xxxx' union select * from t_val_p where field = 'xxxx'
```

这时候问题就来了，两张表的结构虽然相似，但并不完全一致，并不能这样直接 union 处理。  
所以，最快想到的，就是在两张表的外面套一个视图作为中间层，来弥补两张表之间的差异。

```
create view v_val_n asselect
    nname as name,
    type as type,
    type_s as field,
    comments as commentsfrom t_val_n;create view v_val_p asselect
    pname as name,    field as type,    field as field,
    comments as commentsfrom t_val_p;
```

这样就能完美地把两张表的数据给抽取并联合查询出来了。

```
select * from v_val_n where type = 'xxxx' union select * from v_val_p where type = 'xxxx'
```

但问题就有来了，怎么区分两张表中的数据谁是谁？

之前说过了，这两张表中的数据非常相似，在联合起来之后，字段名都改了的情况下，如何区分你我呢？  
那就在视图中加入一个区分符号来区别两张表就可以了嘛！

```
create view v_val_n asselect
    nname as name,    'n' as pos,
    type as type,
    type_s as field,
    comments as commentsfrom t_val_n;create view v_val_p asselect
    pname as name,    'p' as pos,    field as type,    field as field,
    comments as commentsfrom t_val_p;
```

但这么一来，又出新问题了，执行sql的时候，出了这么个错。

```
    could not determine which collation to use for string comparison
```

WTF!

放了好一会儿狗才知道，原来这是“有冲突的隐式collation。必须为任何一个输入表达式附加一个显式的collation说明”之类的东西。  
参照：[https://my.oschina.net/liuyuanyuangogo/blog/213793](https://my.oschina.net/liuyuanyuangogo/blog/213793)

这时候再用软件查看 `v_val_n` 的数据结构，发现 pos 的数据类型是 unknown，难道问题出在这里？
于是再修改 视图的定义。

```
create view v_val_n asselect
    nname as name,    cast('n' as char(1)) as pos,
    type as type,
    type_s as field,
    comments as commentsfrom t_val_n;create view v_val_p asselect
    pname as name,    cast('p' as char(1)) as pos,    field as type,    field as field,
    comments as commentsfrom t_val_p;
```

再去执行

```
select * from v_val_n where type = 'xxxx' union select * from v_val_p where type = 'xxxx'
```

就可以完美得到我想要的东西了~

但话再说回来，如果不用视图，而直接上表关联查询

```
select * from (select 
    nname as name,    'n' as pos,
    type as type,
    type_s as field,
    comments as commentsfrom t_val_n
 ) tnwhere tn.type = 'xxxx'unionselect * from (select
    pname as name,    'p' as pos,    field as type,    field as field,
    comments as commentsfrom t_val_p
) tpwhere tp.type = 'xxxx'
```

倒是能查出数据来，但就像之前说的，这样的sql稍微重了点……