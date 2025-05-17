[目录](./)
# VB.NET 的伪进度条实现的一点记录

公司拿 VB.NET 干活，于是不得已也得去写 VB.NET 代码。  
然后，遇到了一个写进度条的问题。

 需求是这样的
> 一个导入CSV的窗口，后台调用一个shell 程序来执行导入CSV的工作。  
> 然后前台在导入CSV的时候可以显示一个进度条（或者说伪进度条）来表示此时程序正在运行中。  
> 导入完了之后再给个提示说完了。

需求非常简单。

分析以后，基本需要实现这么几个东西。

* 一个计时器，用以每隔一段时间去刷新一次进度条；
* 一个后台shell调用程序，并且要能在shell执行的时候一直等待；
* 一个Form。

再于是，代码也就可以出来了。

第一版代码：
```
Public Class frmCSVImport

    Private count As Integer = 0
    Private Const DEFAULT_PROGRESS_BAR_TXT As String = "CSV文件正在导入"

    ' 其他略 

    ' 导入按钮按下之后的所有操作全部都写在了这个方法内
    Private Sub BtnImport_Click(sender As System.Object, e As System.EventArgs) Handles BtnImport.Click

        Dim csvName As String = TxtCSVName.Text

        If String.IsNullOrEmpty(csvName) Then
            MsgBox("请先选择一个CSV文件。")
            Button1_Click(sender, e)

            Return
        End If

        Dim result As DialogResult = MessageBox.Show("要导入选择的CSV文件吗？", "确认提示", MessageBoxButtons.OKCancel)

        If result = DialogResult.OK Then

            If csvName.Contains(" ") Then
                MsgBox("文件名和路径中不能含有空格。")
                Return
            End If

            BtnImport.Enabled = False
            BtnFindFile.Enabled = False

            LblProgresBar.Text = DEFAULT_PROGRESS_BAR_TXT

            If File.Exists(Application.StartupPath & "\" & prgName & ".log") Then
                File.Delete(Application.StartupPath & "\" & prgName & ".log")
            End If

            Dim startInfo As New ProcessStartInfo(prgName & ".exe")
            startInfo.Arguments = prgName & " " & cmdArg & Chr(27) & csvName
            startInfo.FileName = Application.StartupPath & "\" & prgName & ".exe"

            Dim exeProcess As Process = New Process
            exeProcess.StartInfo = startInfo
            exeProcess.Start()

            ImportTimer.Enabled = True
            ImportTimer.Interval = 150
            ImportTimer.Start()

            exeProcess.WaitForExit() ' 注意这里

            ' 这里之后是导入结束之后的后续操作
            ImportTimer.Stop()
            ImportTimer.Enabled = False

            Dim exitCode As Integer = exeProcess.ExitCode()

            exeProcess.Close()

            BtnImport.Enabled = True
            BtnFindFile.Enabled = True

            Dim confirm As frmConfirm = New frmConfirm
            confirm.init(exitCode, prgName & ".log", Me)
            confirm.Show()

            LblProgresBar.Text = "CSV导入完成。"

        End If

    End Sub

    Private Sub ImportTimer_Tick(sender As System.Object, e As System.EventArgs) Handles ImportTimer.Tick

        If count = 10 Then
            LblProgresBar.Text = DEFAULT_PROGRESS_BAR_TXT
            count = 0
        Else
            LblProgresBar.Text = LblProgresBar.Text & "."
            count = count + 1
        End If

    End Sub
End Class
```

然后，当少量数据的时候，因为速度快，还没来得及去查看整个程序就结束了，也没注意。  
可是数据一多，问题就来了。

什么问题呢？

进度条不动。

这可不行。进度条是整个需求中最关键的一步，少了进度条就等于一半没干。于是这个问题必须解决。

排查的结果很奇怪，删掉CSV导入过程，进度条就活蹦乱跳；加上导入过程，CSV就立马趴窝。  
最终放狗之后基本可以确认原因：线程阻塞。

要显示进度条的变化，而又不想去加大程序的复杂度，所以上了一个定时器（Timer）来做了一个伪进度条。  
但问题就出在这里。因为 Timer 和 导入 CSV 用到的 Process 类都运行在主线程上，而定时器是一个监听器，有资源就触发，没资源就排队。所以当 Process 在等待 后台shell返回执行结果阻塞掉主线程的时候，Timer是不会进行任何运行的，那自然也不会去更新Form上的进度条了。

原因找到了，那解决方案呢？  
很简单。多线程。  
因为导入CSV的过程会阻塞线程，会早成Form的假死，效果非常不好，所以决定将CSV倒入的过程，放到一个单独的线程中去。而Form的主线程不变。

于是，上手改代码。

```
Public Class frmCSVImport
' 其他略...

    Private shell As RunShell = New RunShell
    Private runThread As Thread

    Private Sub BtnImport_Click(sender As System.Object, e As System.EventArgs) Handles BtnImport.Click

        Dim csvName As String = TxtCSVName.Text

        If String.IsNullOrEmpty(csvName) Then
            MsgBox("请先选择一个CSV文件。")
            Button1_Click(sender, e)

            Return
        End If

        Dim result As DialogResult = MessageBox.Show("要导入选择的CSV文件吗？", "确认提示", MessageBoxButtons.OKCancel)

        If result = DialogResult.OK Then

            If csvName.Contains(" ") Then
                MsgBox("文件名和路径中不能含有空格。")
                Return
            End If

            BtnImport.Enabled = False
            BtnFindFile.Enabled = False

            If File.Exists(Application.StartupPath & "\" & prgName & ".log") Then
                File.Delete(Application.StartupPath & "\" & prgName & ".log")
            End If

            ' 装载 shell的内容
            shell.prgName = prgName
            shell.arguments = prgName & " " & cmdArg & Chr(27) & TxtCSVName.Text

            LblProgresBar.Text = DEFAULT_PROGRESS_BAR_TXT
            ImportTimer.Enabled = True

            ' 开启导入线程
            runThread = New Thread(AddressOf shell.run) 
            runThread.Start()

            ' 导入线程开启后，按钮点下的工作就算全部完毕，之后就等待导入线程完成工作就看了
            ' 这里有一个注意点就是，启动了导入线程之后，这里并不需要其他操作，比如写个死循环等待
            ' 如果那样，主线程还是在被阻塞的状态，只不过是从`exeProcess.ExitCode()` 这行的代码变成了循环而已。
            ' 而不用加东西的原因就是，定时器是系统自动调用的，只要对定时器进行操作就可以达到等待的效果。

        End If

    End Sub

    Private Sub ImportTimer_Tick() Handles ImportTimer.Tick

        If shell.isEnd Then ' 在定时器中加入对副线程的判断，当导入线程结束时，主线程也结束整个流程。

            ' 将原来按钮点下之后的操作，转移到定时器中来完成
            ImportTimer.Enabled = False
            LblProgresBar.Text = "CSV导入完成。"
            Dim frm As frmConfirm = New frmConfirm
            frm.init(batch.exitCode, prgName, Me)
            frm.Show()
            runThread.Abort()

        Else

            ' 定时器中的原有操作保持不变
            If count = 10 Then
                LblProgresBar.Text = DEFAULT_PROGRESS_BAR_TXT
                count = 0
            Else
                LblProgresBar.Text = LblProgresBar.Text & "."
                count = count + 1
            End If

        End If
    End Sub
End Class
```
拆分出一个叫 RunShell 的类来运行导入线程，这样就不会对主线程产生任何阻塞了

```
Public Class RunShell

    Public prgName As String
    Public arguments As String
    Public isEnd As Boolean = False
    Public exitCode As Integer

    Public Sub run()

        Dim startInfo As New ProcessStartInfo(prgName & ".exe")
        startInfo.Arguments = arguments
        startInfo.FileName = Application.StartupPath & "\" & prgName & ".exe"

        Dim exeProcess As Process = New Process
        exeProcess.StartInfo = startInfo
        exeProcess.Start()

        ' 将本来会阻塞主线程的导入操作放到这里，然后让其去阻塞导入线程，那主线程就被释放掉了
        ' 所以主线程上的Timer 就有用了
        exeProcess.WaitForExit()

        exitCode = exeProcess.ExitCode()

        exeProcess.Close()

        isEnd = True

    End Sub

End Class
```

嗯，就这样。
 
基本来说，主要的问题是在判断出进度条为什么会不更新。这个东西，在刚看到的时候确实有些懵逼。自己做测试的时候，定时器是可以很好的工作的，但为什么加上导入之后就不动，死活想不通。
知道后来偶然间看到“阻塞”这两个字……

顺便说一句，VB.NET 里面开启线程时那个AddressOf关键字我觉得很神奇。因为这个函数的参数是一个方法名，而从AddressOf这个词的名字上来看，似乎是直接访问那个方法的内存地址？那基本就等于一个函数指针？  
唯一有些让人不爽的就是这个AddressOf无法传递带参的函数。  
也就是说，如果下面这样的代码

```
Sub Main()
    Dim th As Thread = new Thread(AddressOf run)
    th.Start()
End Sub

Sub run(i As Integer)
    ` do something.
End Sub
```

估计是执行不了的，至于是run 的参数 i 被忽略，还是 整个程序报错，没试过，不知道。  
当然，如果需要，可以在类中添加 getter/setter ，通过成员变量来变相实现传参，虽然我自己不太喜欢这种方式。  
而且这种方式又会带来第二个问题，VB.NET 是允许方法重载（overload）的，万一类中有两个名字一样，参数不一样的函数，那AddressOf该去 Of 谁的 Address 呢？

当然，解决方案肯定还是是有的，毕竟微软不可能SB到连这些都想不到。
```
  Sub Main()
        Dim s As System.Threading.ParameterizedThreadStart = New Threading.ParameterizedThreadStart(AddressOf threadfunc)
        Dim t As System.Threading.Thread = New Threading.Thread(s)
        t.Start("hello,我是参数")

    End Sub

    '可以定义线程参数
    Private Sub threadfunc(ByVal param As String)

    End Sub
```