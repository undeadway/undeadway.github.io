[目录](./)
# isNaN

当 isNaN 带有空格时，会当做数字处理，比如

```
isNaN(" 1"); // => false
isNaN("2 "); // => false
isNaN("2 3"); // => true
```

可能和隐式数据类型转换有关……

## 参考

* [https://www.codenong.com/825402/](https://www.codenong.com/825402/)