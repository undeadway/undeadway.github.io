[目录](./)
# Node Sass could not find a binding 错误

```
 ERROR  Failed to compile with 1 error                                                                                                                                                                   9:03:27 ├F10: AM
┤

 error  in ./src/core/assets/styles/scss/element-variables.scss

Syntax Error: Error: Missing binding D:\workspace\iot-operations\iot-operations-web\node_modules\node-sass\vendor\win32-x64-72\binding.node
Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 12.x

Found bindings for the following environments:
  - Windows 64-bit with Node.js 12.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.


 @ ./src/core/assets/styles/scss/element-variables.scss 4:14-264 15:3-20:5 16:22-272
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://172.30.10.172:8080&sockPath=/sockjs-node (webpack)/hot/dev-server.js ./src/main.js
```

在启动服务（npm run dev）的时候会出现一下错误

Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 12.x

错误原因是因为node-sass的版本不正确，需要将node-sass包卸了之后重新安装即可：

卸载：`npm uninstall node-sass`

安装：`npm install node-sass`

然后在重新启动即可。

也可以使用：`npm rebuild node-sass`，进行重启