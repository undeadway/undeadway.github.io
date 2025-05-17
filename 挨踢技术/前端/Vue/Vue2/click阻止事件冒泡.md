[目录](./)

# click阻止事件冒泡

使用vue阻止子级元素的click事件冒泡。简单得：可以直接用stop

```
<div @click="test1()">    
    <span @click.stop="test2()">按钮1</span>    
    <span>按钮2</span> 
</div>
```

## 参考

* [https://blog.csdn.net/weixin_42365757/article/details/119917017](https://blog.csdn.net/weixin_42365757/article/details/1199170171)
* [https://blog.csdn.net/weixin_29491885/article/details/101213311](https://blog.csdn.net/weixin_29491885/article/details/101213311)