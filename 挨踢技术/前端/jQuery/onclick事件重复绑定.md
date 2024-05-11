[目录](./)
# Ionclick事件重复绑定

```
$("#e1").on('click', function() {
    alert(1);
});
$("#e1").on('click', function() {
    alert(2);
});
```

本以为上面的代码结果会是第二个覆盖掉第一个，但结果是两个连续执行。
要想覆盖，只能先解除绑定旧的再绑定新的。

```
$(this).unbind('click');
```