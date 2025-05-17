[目录](./)
# 【VB.NET】关于定时器的一些后续

在 [VB.NET 的伪进度条实现的一点记录](./VB_NET的伪进度条实现的一点记录) 说过了定时器，这次就来点比较高端的玩法。

假设要开发一个守护进程，让其每隔一定的时间去执行一些功能。比如像杀毒软件那样每隔一个星期全盘扫描一次硬盘之类的。

于是，首先想到的，就是定时器。  
但问题在于，守护进程并不需要界面，所以之前用过的System.Windows.Forms.Timer就不再适用了。那如何是好？

还好，.NET 环境给我们预备了三个定时器类。
```
System.Windows.Forms.Timer
System.Timers.Timer
System.Threading.Timer
```
一个个试过来。

## 1. System.Windows.Forms.Timer
这个寄宿于 Windows的窗体（Form），所以要实用它就得首先画一个窗体，可是这次我却是没有窗体的守护进程，那首先就抛弃这个定时器。  
而且之前的例子也有过详细说明，这里就略过吧。

## 2. System.Timers.Timer
代码也很简单
```
Module Module1

    Private index As Integer = 0

    Public Sub main()

        Dim timer As System.Timers.Timer = New System.Timers.Timer
        AddHandler timer.Elapsed, AddressOf runTimer

        timer.Enabled = 100
        timer.Start()

    End Sub

    Public Sub runTimer()
        Console.WriteLine(index)
        index = index + 1
    End Sub

End Module
```
本来期待着没100毫秒打印一次计数，但结果却让我惊讶，这个程序有时不执行，有时一次，有时两次，但不管几次，最终都会停下，而不是如我想像的那样一直运行下去。

百思不得其解。

仔细想想，反向推论一下：程序停止 -> 所有线程都执行完毕 -> 定时器没有宿主，也就执行不了了

但有些奇怪，为什么之前玩System.Windows.Forms.Timer的时候没有出现过这个情况呢？  
因为 System.Windows.Forms.Timer 是寄宿在窗体上的，窗体线程一直运行着，直到关闭窗体。

好，原因知道了，那解决方案也很简单——多线程。  
主线程写个死循环让程序不要停。在子线程里面写定时器去执行相关内容。

改造之后的代码
```
Module Module1

    Private mt As MyTimer = New MyTimer

    Public Sub main()

        Dim th As Threading.Thread = New Threading.Thread(AddressOf mt.init)
        th.Start()

        While True
        End While

    End Sub

End Module

Imports System.IO

Public Class MyTimer

    Private index As Integer = 0

    Public Sub init()
        Dim timer As System.Timers.Timer = New System.Timers.Timer
        AddHandler timer.Elapsed, AddressOf runTimer

        timer.Enabled = 100
        timer.Start()
    End Sub

    Public Sub runTimer()
        Console.WriteLine(index)
        index = index + 1
    End Sub

End Class
```

## 3. System.Threading.Timer
这个类和 System.Timers.Timer差不多。  
主线程类不用动，修改 MyTimer类。
```
Imports System.IO
Imports System.Threading

Public Class MyTimer

    Private index As Integer = 0

    Public Sub init()
        Dim timer As System.Threading.Timer = New System.Threading.Timer(New TimerCallback(AddressOf runTimer), Nothing, 0, 100)
        'Dim timer as System.Timers.Timer = new System.Timers.Timer
        'AddHandler timer.Elapsed, AddressOf runTimer

        'timer.Enabled = 100
        'timer.Change() '.Start()
    End Sub

    Public Sub runTimer()
        Console.WriteLine(index)
        index = index + 1
    End Sub

End Class
```
以上就是 .NET 三种 Timer 的玩法了，但总觉得好麻烦，毕竟要开两个线程，还得再加线程等等。  
定时器之外，那有没有其他方法了呢？  
有。  
而且很简单，一行代码搞定。
```
Thread.Sleep(1000)
```
如果只是每隔一段时间就去做些什么，那首先想到的一定是写个死循环，然后让它在后台一直运行下去就可以了。这就是这行代码的精髓。

但然后就会引申出一个问题，定时器和Thread.Sleep的效率问题。

这个不好评价。但总体来说，我自己更喜欢Thread.Sleep。原因有二：

1. 代码少，不用多很多定时器的定义
2. 不用开多线程，光这个就可以让我枪毙定时器了

但Thread.Sleep是线程阻塞的，如果还想在空闲时搞点别的操作，或者两个定时器什么的，那就只能上定时器了。