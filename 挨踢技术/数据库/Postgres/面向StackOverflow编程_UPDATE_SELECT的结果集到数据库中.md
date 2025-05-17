[目录](./)
# [面向StackOverflow编程]UPDATE SELECT的结果集到数据库中

遇到一个比较搞人的事情：要将`SELECT`出来的结果集更新到另一张表里去。
虽然如果用写代码的方式也可以实现，但毕竟来回折腾比较烦人，于是想着正好训练一下自己的SQL能力，就开始了折腾自己。

首先，网上（对，说的就是你 CSDN）找到了类似的SQL

```
UPDATE `table_name` AS alias_1 INNER JOIN (SELECT * FROM `table_name` WHERE `column` = value)AS alias_2 SET alias_1.column_1 = value WHERE alias_1.id = alias_2.id
```

看起来挺正常的，但一执行，直接报错：

```
    (SQL错误)
    SQL   : syntax error at or near “INNER”
```

WTF!
总之来回折腾，把`ON`改成`where`，把`set`写在最后等等。都没能解决这个问题。  
实在搞不定，将`syntax error at or near "INNER"`这句错误信息拿去喂狗，在SOF上，一下子就出了结果。  
[https://stackoverflow.com/questions/27902547/repair-syntax-error-at-or-near-inner-while-using-update](https://stackoverflow.com/questions/27902547/repair-syntax-error-at-or-near-inner-while-using-update)

> (而后在 18摸上也看到了中文的资料)
> [https://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.5.0/com.ibm.db2.luw.apdv.routines.doc/doc/c0011133.html](https://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.5.0/com.ibm.db2.luw.apdv.routines.doc/doc/c0011133.html)

正确的语法应该是

```
    UPDATE target_table    SET ...    FROM other_table
    [ optional JOIN ... ON ... ]    WHERE ...
```

想想也是，`INNER JOIN `是内连接，要连接肯定得有个对象，这里没有任何被连接的对象，怎么看都有问题。而如果被连接的对象是`UPDATE`那张表，到底上似乎说的通，但总觉得哪里怪怪的，如果加上`FROM`，一切都顺理成章了。

照着最初找到的SQL写，能对才有鬼了。