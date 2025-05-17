[目录](./)
# iframe子页面中调用父页面的js对象

## 第一种记录

A.html

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title> main window </title>

  <script type="text/javascript">
  // main js function
  function fMain(){
    alert('main function execute success');
  }

  // exec iframe function
  function exec_iframe(){
    window.myframe.fIframe();
  }
  </script>

 </head>

 <body>
  <p>A.html main</p>
  <p><input type="button" value="exec iframe function" οnclick="exec_iframe()"></p>
  <iframe src="B.html" name="myframe" width="500" height="100"></iframe>
 </body>
</html>
```

B.html
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title> iframe window </title>

  <script type="text/javascript">
  // iframe js function
  function fIframe(){
    alert('iframe function execute success');
  }

  // exec main function
  function exec_main(){
    parent.fMain();
  }
  </script>

 </head>

 <body>
  <p>B.html iframe</p>
  <p><input type="button" value="exec main function" οnclick="exec_main()"></p>
 </body>
</html>
```

以上方法针对 chrome 无效，原因参考：[https://stackoverflow.com/questions/29983786/blocked-a-frame-of-origin-null-from-accessing-a-cross-origin-frame-chrome](https://stackoverflow.com/questions/29983786/blocked-a-frame-of-origin-null-from-accessing-a-cross-origin-frame-chrome)

chrome解决方案：需要上服务器。

## 第二种记录

父页面：
```
function todo () {
    console.log("todo");
}
window.todo = todo;
```
子页面
```
window.partent.todo(); // todo
```
