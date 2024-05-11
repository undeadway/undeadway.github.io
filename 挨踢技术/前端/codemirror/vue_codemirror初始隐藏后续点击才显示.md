[目录](./)
# vue codemirror初始隐藏，后续点击才显示

```
<codemirror ref="myCm" v-model="code[xxx]" :options="yyy"></codemirror>
```

主动刷新函数

```
setTimeout(
    function() {
        this.$refs.myCm.codemirror.refresh();
    }.bind(this),
    1
);
```

* 参考1：[https://bbs.huaweicloud.com/blogs/detail/152434](https://bbs.huaweicloud.com/blogs/detail/152434)
* 参考2：[https://stackoverflow.com/questions/8349571/codemirror-editor-is-not-loading-content-until-clicked](https://stackoverflow.com/questions/8349571/codemirror-editor-is-not-loading-content-until-clicked)
