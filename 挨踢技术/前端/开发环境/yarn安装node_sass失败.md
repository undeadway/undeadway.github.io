[目录](./)
# yarn安装node_sass失败

公司的一个项目，在用 win10 安装 node-sass 的时候，报出了一大片奇奇怪怪的错误：

```
“C:\workspace\jiami_***_jiami\node_modules\node-sass\build\binding.sln”(默认目标) (1) ->
“C:\workspace\jiami_***_jiami\node_modules\node-sass\build\binding.vcxproj.metaproj”(默认目标) (2) ->
“C:\workspace\jiami_***_jiami\node_modules\node-sass\build\src\libsass.vcxproj”(默认目标) (3) ->
(ClCompile 目标) ->
  c1xx : fatal error C1083: 无法打开源文件: “C:/Program”: No such file or directory [C:\workspace\jiami_***_jiami\node_modules\node-sass\build\src\libsass.vcxproj]
  c1xx : fatal error C1083: 无法打开源文件: “Files/Git/MP8”: No such file or directory [C:\workspace\jiami_***_jiami\node_modules\node-sass\build\src\libsass.vcxproj]
```

粗粗一看，都是什么 vcxproj 的编译报错信息。  
为毛会有 visual studio 工程的编译？  
完全不懂……  

不管是 npm 安装还是 yarn ，问题始终存在。  
甚至更换了 Nodejs 的版本，问题还是没有解决。    
这其中甚至还包括了不用管理员权限，中文就全是乱码之类的操蛋事……

直到我抱着尝试一下的想法，用了 cnpm ，  
问题就这么解决了……

很怀疑是墙的原因。  
不过没证据。

但在相同的网络环境下，linux 里就没任何问题，所以也怀疑不是墙的问题。

