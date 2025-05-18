[目录](./)

# reselect

## 这个中间件的目的

> 在使用redux时，我们通常会创建很多selector来从store中读取数据。下面的代码取自于redux的todomvc示例。  
> 这个代码有一个潜在的问题。每当state tree改变时，selector都要重新运行。当state tree特别大，或者selector计算特别耗时，那么这将带来严重的运行效率问题。  
> 为了解决这个问题，reselect为selector设置了缓存，只有当selector的输入改变时，程序才重新调用selector函数。

老实说，没怎么看懂。  
[https://blog.csdn.net/anxin_wang/article/details/79081151](https://blog.csdn.net/anxin_wang/article/details/79081151)

感觉似乎和我的 [一个http封装](/挨踢技术/前端/axios/一个http封装) 有些类似？