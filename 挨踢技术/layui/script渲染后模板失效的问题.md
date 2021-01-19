如果有这样的代码
```
<div id="test">
	<script type="text/html" id="test-tpl">
	<div class="layui-progress">
	  <div class="layui-progress-bar" lay-percent="10%"></div>
	</div>
	</script>
</div>
```

如果用 laytpl 编译后，
```
laytpl($("#test-tpl").html()).render(res, function (html) {
	$("#test").html(html);
});
```
layui 的组件不会被编译。  
上述代码中就是
```
	<div class="layui-progress">
	  <div class="layui-progress-bar" lay-percent="10%"></div>
	</div>
```

如果要让上面的组件可以被利用，需要通过 reload 方法再编译一遍这段 html。