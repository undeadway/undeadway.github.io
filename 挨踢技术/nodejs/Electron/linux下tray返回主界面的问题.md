[目录](./)
# linux 下 tray 返回主界面的问题

```
tray.on("click",()=>{
	mainWindow.show();
});
```

上面这段代码在 linux 中会无效，不管是双击还是单击都无法从 tray 中返回主界面，需要单独做处理。

菜单定义时加上：
```
{
	label: "显示主界面",
	click () {
		windows.show();
	}
}
```

然后在 windows 中定义：
```
windows.show = () => {
	mainWindow.show();
};
```