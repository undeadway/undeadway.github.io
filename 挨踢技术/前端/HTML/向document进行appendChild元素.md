[目录](./)
# 向 document 进行 appendChild 元素

```
document.appendChild(e);
```

> (Chrome会报错)
> Failed to execute ‘appendChild’ on ‘Node’: Only one element on document allowed.

要修改成（这种写法更标准，更不会出错）

```
document.body.appendChild(e);
```