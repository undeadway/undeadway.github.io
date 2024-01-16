[目录](./)
# win下electron因resizable:false引发的高度变化bug

### 现象
Electron 窗体，点击最小化按钮后，每次再打开窗体，高度都会缩小 20 来个 px。

### 解决方案
```
mainWindow = new BrowserWindow({
	resizable:true // 这里设置为 true 就可以了
});
```

### 参考
[https://newsn.net/say/electron-bug-resizable.html](https://newsn.net/say/electron-bug-resizable.html)