[目录](./)

# echarts高宽不能用百分比

echarts 的外部 div，甚至 echarts 自身在设置高宽时，必须设置一个固定值，而不能是百分比。

所以，如果要用动态的高宽值，就需要用到 echats 的 resize 方法。