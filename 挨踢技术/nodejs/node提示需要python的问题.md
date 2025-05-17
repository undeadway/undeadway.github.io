[目录](./)
# node提示需要python的问题

今天用新电脑重新安装公司前端框架的时候

```
gyp verb check python checking for Python executable "python2" in the PATH
gyp verb `which` failed Error: not found: python2
gyp verb `which` failed     at getNotFoundError (D:\workspace\myproject\vue-demo\node_modules\which\which.js:13:12)
gyp verb `which` failed     at F (D:\workspace\myproject\vue-demo\node_modules\which\which.js:68:19)
gyp verb `which` failed     at E (D:\workspace\myproject\vue-demo\node_modules\which\which.js:80:29)
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\which\which.js:89:16
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\index.js:42:5
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\windows.js:36:5
gyp verb `which` failed     at FSReqCallback.oncomplete (fs.js:168:21)
gyp verb `which` failed  python2 Error: not found: python2
gyp verb `which` failed     at getNotFoundError (D:\workspace\myproject\vue-demo\node_modules\which\which.js:13:12)
gyp verb `which` failed     at F (D:\workspace\myproject\vue-demo\node_modules\which\which.js:68:19)
gyp verb `which` failed     at E (D:\workspace\myproject\vue-demo\node_modules\which\which.js:80:29)
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\which\which.js:89:16
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\index.js:42:5
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\windows.js:36:5
gyp verb `which` failed     at FSReqCallback.oncomplete (fs.js:168:21) {
gyp verb `which` failed   code: 'ENOENT'
gyp verb `which` failed }
gyp verb check python checking for Python executable "python" in the PATH
gyp verb `which` failed Error: not found: python
gyp verb `which` failed     at getNotFoundError (D:\workspace\myproject\vue-demo\node_modules\which\which.js:13:12)
gyp verb `which` failed     at F (D:\workspace\myproject\vue-demo\node_modules\which\which.js:68:19)
gyp verb `which` failed     at E (D:\workspace\myproject\vue-demo\node_modules\which\which.js:80:29)
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\which\which.js:89:16
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\index.js:42:5
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\windows.js:36:5
gyp verb `which` failed     at FSReqCallback.oncomplete (fs.js:168:21)
gyp verb `which` failed  python Error: not found: python
gyp verb `which` failed     at getNotFoundError (D:\workspace\myproject\vue-demo\node_modules\which\which.js:13:12)
gyp verb `which` failed     at F (D:\workspace\myproject\vue-demo\node_modules\which\which.js:68:19)
gyp verb `which` failed     at E (D:\workspace\myproject\vue-demo\node_modules\which\which.js:80:29)
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\which\which.js:89:16
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\index.js:42:5
gyp verb `which` failed     at D:\workspace\myproject\vue-demo\node_modules\isexe\windows.js:36:5
gyp verb `which` failed     at FSReqCallback.oncomplete (fs.js:168:21) {
gyp verb `which` failed   code: 'ENOENT'
gyp verb `which` failed }
gyp verb could not find "python". checking python launcher
gyp verb could not find "python". guessing location
gyp verb ensuring that file exists: C:\Python27\python.exe
gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (D:\workspace\myproject\vue-demo\node_modules\node-gyp\lib\configure.js:484:19)
gyp ERR! stack     at PythonFinder.<anonymous> (D:\workspace\myproject\vue-demo\node_modules\node-gyp\lib\configure.js:509:16)
gyp ERR! stack     at callback (D:\workspace\myproject\vue-demo\node_modules\graceful-fs\polyfills.js:299:20)
gyp ERR! stack     at FSReqCallback.oncomplete (fs.js:168:21)
gyp ERR! System Windows_NT 6.1.7601
gyp ERR! command "D:\\software\\nodejs\\node.exe" "D:\\workspace\\myproject\\vue-demo\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags=" "--libsass_library="
gyp ERR! cwd D:\workspace\myproject\vue-demo\node_modules\node-sass
gyp ERR! node -v v12.18.4
```

然后就想起了自己为什么非要把操作系统换成 Deepin ，以及自己为什么讨厌 python 的原因了。

至于解决方案。
** 换 Linux **

如果做不到，执行以下命令
```
npm install --global --production windows-build-tools
```

~~上面这个命令执行过后，会经常性失效，不知道为什么。~~

执行完毕后，不能关闭命令窗口？、
不然如果还要再次执行安装操作，还是会报错。
