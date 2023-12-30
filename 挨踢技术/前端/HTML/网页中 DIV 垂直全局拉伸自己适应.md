[目录](./)
# 网页中 DIV 垂直全局拉伸自己适应

```
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8" />
    <title>DIV 垂直全局拉伸自己适应</title>
    <style type="text/css">

html, body { height: 100%; padding: 0; margin: 0; }

.wrapper { height: 100%; padding: 100px 0 0; box-sizing: border-box ; }

.body_title {
   height: 100px; line-height:100px; margin-top:-100px; background: #BBE8F2;
}
.body_main {height: 100%; background: #D9C666;
   position: relative;
}
</style>
</head>
<body>
    <div class="wrapper">
        <div class="body_title"></div>
        <div class="body_main"></div>
    </div>
</body>
</html>
```