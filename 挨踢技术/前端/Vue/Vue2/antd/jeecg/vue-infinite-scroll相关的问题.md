[目录](./)
# vue-infinite-scroll 相关的问题

## 现象
因为要无限向下滚动，载入了 `vue-infinite-scroll` ，但因此出现了如下图的错误。

![](./6fc3b2d0e5d446539e78cf6998de58ef.png)

## 解决方法
根据报错提示找到/src/components/NumberInfo/NumberInfo.vue文件把 @import “index”; 注释了

![](./180de66b24704c1daf6305a74f294cac.png)  
![](./62cbe0aeae434fdd9d57cd317ed962da.png)

## 结果
![](./c54201085c2d4ac28e3382030646da18.png)

## 参考
* [https://blog.csdn.net/weixin_43811057/article/details/126299399](https://blog.csdn.net/weixin_43811057/article/details/126299399)