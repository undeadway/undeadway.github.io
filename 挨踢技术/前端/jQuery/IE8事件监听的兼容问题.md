[目录](./)
# IE8事件监听的兼容问题

有如下代码
```
<p class="notice-content max-width" data-id="12345678">testtest</p>
```

在新浏览器中，用以下代码可以解决时间监听。
```
$(".notice-li-data").on('click', function (e) {
    console.log('e', e.target.dataset.id);
 })
```

ie8 不识别 `dataset` 所以要修改为：
```
<p class="notice-content max-width" id="12345678" data-id="12345678">testtest</p>
```

```
$(".notice-li-data").on('click', function (e) {
    console.log('e', e.target.id);
})
```

 则能兼容