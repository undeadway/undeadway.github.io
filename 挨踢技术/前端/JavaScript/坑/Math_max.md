[目录](./)
# Math.max

当输入的参数为空时，则会返回 `-Infinity` 。

```
const output = Math.max();
```

但为什么是 `-Infinity` ，不知道……

与此同时，`Math.min` 的返回值是 `Infinity` 。

然后再一想，也对，什么都没有的时候最大值不就是 `-Infinity` 么，然后任何值都比这个大，自然有值了就会去输入的那个值。  
如果默认的最大值是 `Infinity` ，那不管输入什么，最大值都是 `Infinity` 了。