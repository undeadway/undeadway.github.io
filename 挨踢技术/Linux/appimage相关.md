[目录](./)
# appimage相关

appimage自身支持直接压缩和解压

--appimage-extract

* extracts the contents from the embedded filesystem image, then exits. This is useful if you are using an AppImage on a system on which FUSE is not available
* 从嵌入的文件系统映像中提取内容，然后退出。如果您在FUSE不可用的系统上使用AppImage，这将非常有用

```
$ xxxx.AppImage --appimage-extract
```
* linuxdeployqt 可以用来给可执行程序复制引用库、制作AppRun、快捷方式并压缩。
* appimagetool 则可以直接压缩 “已经打包好的appimage解压后的文件夹（上一步解压的文件夹）”。

请注意使用appimagetool压缩时，只检验文件夹内是否存在快捷方式和AppRun，至于需要连接的库不再验证，如果自己解压后手动删除了引用库会造成新压缩后文件无法使用。
```
$ appimagetool xxxx包含AppImage内容的文件夹
```
> appimagetool 可从此处下载：wget "https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-aarch64.AppImage"

## 来源

* [https://www.cnblogs.com/hencins/p/14446164.html](https://www.cnblogs.com/hencins/p/14446164.html)
