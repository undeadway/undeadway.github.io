[目录](./)
# git一键提交

## 目的

一个在每次命令行操作 git 的时候，不需要重复输入用户名、密码的脚本  
操作包括 git 的全部操作，以及自定义操作

什么，你说 `git config --global credential.helper store` ？   
我不知道，我没看见！

而且就算少输入
```
git add .
git commit xxx
```
也是好的嘛～

## 注意事项

 1. 该脚本使用前，必须先 cd 到对应的工程目录下（获得帮助和版本号不用）
 2. 所有项目都要在自己的根目录下配置（有 .git 文件夹）

## 操作详解

| 命令名 | 参数 | 参数解释 | 必须 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| status | - | - | - | - | 同 `git status` |
| -v / --version | - | - | - | - | 获得版本号 |
| -h / --help / -? | - | - | - | - | 获得帮助，不输入任何参数也是同样的效果 |
| set | -U username | 用户名 | Y | - | |
| | -P password | 密码 | Y | - | |
| | -p project | 项目 | N | 工程所在的文件夹名 | |
| | -lb lbranch | 本地分支 | N | master | |
| | -rb rbranch | 远程分支 | N | master | |
| pull | -p project | 项目 | N | 配置的值 | |
| | -o origin | 远程主机名 | N | 配置的值 | |
| | -lb lbranch | 本地分支 | N | 配置的值 | |
| | -rb rbranch | 远程分支 | N  | 配置的值 | |
| push | -p project | 项目 | N  | 配置的值 | |
| | -o origin | 远程主机名 | N | 配置的值 | |
| | -lb lbranch | 本地分支 | N | 配置的值 | |
| | -rb lbranch | 远程分支 | N  | 配置的值 | |
| | -m commit | 提交备注 | N  | "${当前时间}的提交" | |

代码仓库：[https://gitee.com/undeadway/mygit](https://gitee.com/undeadway/mygit)