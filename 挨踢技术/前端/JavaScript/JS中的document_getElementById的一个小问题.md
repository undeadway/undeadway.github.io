[目录](./)
# JS中的document.getElementById的一个小问题

有如下代码：
```
<html>
<body>
<div id="catalog">catalog</div>
</body>
<script type="text/javascript">
var getElementById = window.document.getElementById;
alert(getElementById("catalog").innerHTML);
</script>
</html>
```

期待着跳出#catalog中的内容，但是，FF却给了我一个错误：`Could not convert JavaScript argument`

更详细的错误信息：
```
时间戳: 2012-5-11 0:28:17
错 误： uncaught exception: [Exception... "Could not convert JavaScript argument"  nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"  location: "JS frame :: file:///F:/workspace/js/test.html :: <TOP_LEVEL> :: line 8"  data: no]
```

本着浏览器兼容的精神，稍微修改了一下代码
```
<html>
<body>
<div id="catalog">catalog</div>
</body>
<script type="text/javascript">
try {
   var getElementById = window.document.getElementById;
   alert(getElementById("catalog").innerHTML);
} catch (e) {
   alert(e);
}
</script>
</html>
```

分别在Chromium8、IE8和Opera9下试验了一下，分别得到了
```
TypeError: Illegal invocation,
[object]
```
和
```
<localhost>

[InternalException:
name: Error
message: WRONG_THIS_ERR
]
```

总而言之，就是没一个是显示我想要的内容的，百思不得及其解。

后来经过百般搜索和上论坛询问，终于得到了这个问题的答案（应该？）

> 类似console.log方法,参照这里[http://stackoverflow.com/questions/8904782/uncaught-typeerror-illegal-invocation-in-javascript](http://stackoverflow.com/questions/8904782/uncaught-typeerror-illegal-invocation-in-javascript)
> 
> document.getElementById可能在内部也有类似
> ```
if(this !== document){
    throw new TypeError('Illegal invocation');
}
```
> 
> 这样的判断,那么你的引用
> ```
var getElementById = window.document.getElementById;
```
> 
> 显然就行不通了。

原因是找到了，于是就是解决方案了。
`getElementById(id)`的意思就是引用页面的指定ID对象。
如果未指明`document.getElementById`的引用对象就赋值给变量，就意味着对象断开了当前`document`上下文环境的引用。

因此，需要将this.document指向当前创建的对象变量:

```
var getElementById = document.getElementById;
alert(getElementById.call(this.document,'catalog').innerHTML);
```

又或者

```
document.getElementById = function(fn){
    return function(){ 
        return fn.apply(this.document,arguments);
    };
}(document.getElementById);

var getElementById =window.document.getElementById;
alert(getElementById("catalog").innerHTML);
```

比较恶心，于是最后决定放弃不去管了……

最后的最后，看到下面的这些，算是被气笑了

> 要么var getElementById = window.document.getElementById("catalog");  
> 要么要么var getElementById = window.document;  
> 这个var getElementById = window.document.getElementById;算哪门子事？


> 你这window.document.getElementById 引用什么了？！！  
> window.document.getElementById('catalog')这样才是引用对象.