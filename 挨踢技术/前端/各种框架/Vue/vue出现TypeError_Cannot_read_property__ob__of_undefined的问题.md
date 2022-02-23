[目录](./)
# vue 出现 TypeError: Cannot read property '__ob__' of undefined 的问题

原因是
```
data () {}
```
里没有做任何定义返回值，只要定义一下返回值就可以了。