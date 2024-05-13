[目录](./)
# JS 获得地址栏中？之后的参数

```
var getUrlParam = function (name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null
    };
}
```

## 参考

* [ttps://www.jb51.net/article/47656.htm](ttps://www.jb51.net/article/47656.htm)