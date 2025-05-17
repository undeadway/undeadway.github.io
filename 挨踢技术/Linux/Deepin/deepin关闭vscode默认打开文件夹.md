[目录](./)
# deepin关闭vscode默认打开文件夹

在deepin系统下载vscode，打开一些目录就会使用vscode打开目录。要想用尝试自己的文件夹管理打开，在命令行中执行以下命令：

```
xdg-mime default dde-file-manager.desktop inode/directory
```