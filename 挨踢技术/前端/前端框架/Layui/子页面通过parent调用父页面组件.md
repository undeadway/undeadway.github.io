[目录](./)
# 子页面通过parent调用父页面组件

比如通过 iframe 组合起来的两个页面，子页面要调用父页面的元素，需要父页面中本来就注册过该元素。

index.html
```
<!DOCTYPE html>
<html lang="zh-CN">

<head>
	<meta charset="UTF-8" />
	<script type="text/javascript" src="layui/layui.js"></script>
	<link rel="stylesheet" type="text/css" href="layui/css/layui.css" />
</head>

<body>
<iframe src="frame.html"></iframe>
</body>
<script>
	layui.use(["layer"], function () { // 这里得先注册，或者挂载在 window 中

	});
	window.test = function() {
		alert("test");
	};
</script>

</html>
```
frame.html
```
<!DOCTYPE html>
<html lang="zh-CN">

<head>
	<meta charset="UTF-8" />
	<script type="text/javascript" src="layui/layui.js"></script>
	<link rel="stylesheet" type="text/css" href="layui/css/layui.css" />
</head>

<body>
	<button id="hello">按钮</button>
</body>
<script>
	layui.use(["layer"], function () {

		$("#hello").on("click", function () {
			parent.layer.msg("操作成功"); // 这里想要通过 praent 调用父页面的某个组件
			parent.test();
		});
	});
</script>

</html>
```