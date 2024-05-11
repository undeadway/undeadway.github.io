[目录](./)
# error failed to push some refs to

新建了一个仓库，提交到码云上，但提示我：

> waygc@waygc-pc /home/waygc/workspace/[工程名打码]  
> $ git push -u origin master  
> error: src refspec master does not match any  
> error: failed to push some refs to 'https://gitee.com/[仓库名打码].git'

这什么鬼？

网上找了一些资料，发现自己的邮箱什么都已经配置了，不解。
于是 `branch` 了一下，发现问题了

> waygc@waygc-pc /home/waygc/workspace/[工程名打码]  
> $ git branch  
> ×main

好吧，白左们，你们赢了。