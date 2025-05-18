[目录](./)
# 构建npm时提示没有找到可以构建的npm

微信小程序中，构建 npm 管理的时候，提示“没有找到可以构建的npm包”：

![](./before.png)

输入：
```
npm i miniprogram-sm-crypto --production
```
执行命令完之后，然后再去微信开发者中点工具-构建npm，然后就可以了。

![](./after.png)
