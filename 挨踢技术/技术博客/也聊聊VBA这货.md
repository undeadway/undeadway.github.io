[目录](./)

给鬼子做东西，真心没太多高技术含量的东西。大多都是那些高重复性的活。  
所以有些时候问什么架构、设计基本成了屠龙术——纯摆设。真正发挥自己编程能力的，反而是 VBA。

但 VBA 这货怎么说呢，开始的时候还为某些细节设计叫好，但用的多了，就想开始骂娘了，这都 TM 什么恶心设计。  
首 当其冲就是 Collection 和 Dictionary 这两个对象，从名称上看，是 集合 和 字典 。但不管哪种语言，对于这种基本的数据类型，都应该要有储存 / 获取（get/set）方法才行吧——至少也得有个 find/indexOf/has/contains 之类的方法不是（Exists方法倒是有一个）——不然光给一个数据结构有啥用？  
但 VBA 倒好，只有 add，却没有 get。我第一次真的楞了半天，艹，到底怎么取值！网上查了之后才知道这货竟然要显式循环取值，这尼玛什么鬼啊！  
最后不得已自己写了 getValueFromCollection 和  getValueFromDictionary 才算完。

但这还不算完！

一个类似 Map 结构的对象，网络搜索之后发现 Dictionary 是最合适的数据类型，准备用之。但 Excel 的编译器始终提醒我 找不到 Dictionary 这个对象。  
我囧了半天，再去看 Excel 的帮助文档才发现 Dictionary 这货居然要用
```
Set dic = CreateObject("Scripting.Dictionary")
```

这种方式来创建。
但是，相对`Collection`，却只要`New`一下就可以了，为啥到了`Dictionary`待遇就变了呢？  
不过不管怎么说，这对象总算是被创建出来了。  
但接着问题就来了，要是想要在`Sub`之间通过参数来调用 创建出来的`Dictionary`就成了难题。

尝试过
```
Sub Test(dic As Dictionary)
End Sub
```
```
Sub Test(dic As Scripting.Dictionary)
End Sub
```
```
Set Test(dic As CreateObject("Scripting.Dictionary"))
End Sub
```

等等方式，结果都被编译器打了回来。到这时候我都快对 Sub 间传值绝望了，在抱着最后试一试的心态下，写了下面的代码
```
Sub Main()
    Dim dic as Object
    Set dic = CreateObject("Scripting.Dictionary")
    Test dic
End Sub

Sub Test(dic As Object)
End Sub
```

然后，上面的代码就这么通过了……  
通过了……  
过了……  
了……

代码虽然是通过了，但实在让我囧了半天，一下子无法接受这种设计，而且最让人无语的就是自定义 `Sub` / `Function` 无法这么写，但 VBA 自己预置的函数却没有这种限制……  
VBA 这种设计，真的让人比较无语，我现在想吐槽，却没词去吐槽这货了……
关于这点，从实现来看，VBA 似乎有 “继承” 这个概念。但如果要执行下面的代码，保证被编译器一脚踢回来，原因：**数据类型不匹配**。
```
Sub Main()
    Dim str As String
    str = "mystring"

    Test str

End Sub

Sub Test(dic As Object)
End Sub
```

想到这里，于是换一种写法：
```
Sub Main()

    Dim str As Object
    str = "mystring"

    Test str
End Sub

Sub Test(dic As Object)
End Sub
```

结果编译器华丽丽地提示我：**对象变量或 With 块变量未设置**  
但再一想，也对。谁说世界上所有的语言都要和 Java 一样，所有类型都继承自 Object 呢？C\+\+ 不就没一个共通超类么，也许 VBA 就和 C\+\+ 类似。

哦，对了，With 也是一大 SB 特色，至于 with 这货在 JS 中已经被批臭了，我就不再多展开了～

其实 VBA 最 SB 的就是 Excel 的编辑器默认的设定，比如我写下面这行代码
```
Set dic = CreateObject("Scripting.Dictionary")
```

写的时候，一定要从头到尾写完才行，中间稍微脑洞一下，少了最后的括号，准备去修改别的东西， Excel 编辑器的默认设置就噔弹出个对话框来，警告我语法不正确。  
但是，在我语法真的错了的时候，Excel 这货却没有任何提醒，只会在编译不通过的时候告诉你，这里错了。  
这算啥？我不知道这算啥。这种强制弹窗，除了好几年前在各种小广告上看到过之后，已经很少看到这种恶心的设计了。这种突然跳出来的弹窗，真的很恶心。而且现在各种小广告都好像不用这种方式了，怎么 Excel 2010 还保留着这种设计？

说到编译器， VBA 的 IDE 可以说真是恶心到家了。或者说 VBA 很大程度上就是被 IDE 给搞坏的，比如不区分大小写，我自己认为不区分大小写就是 VBA（甚至 VB ）的原罪。  
这 导致写 VBA 的时候，会很依赖编译器去自动判断大小写，如果一个变量没有 Dim 过，又和系统预定义的变量重名，那编译器会非常“贴心”的帮你把大小写改成和系统预定义的变量一致。当然，这种情况可以理解，因为编译器希望你能去 Dim 对象。但如果真这样，那接下来关于 VBA 定义对象的几种方式，却又让我怀疑之前的推测。因为这简直就是在打自己的嘴巴……

一般来说， VBA 定义变量有三种方式：

1 最严谨的 Dim 定义方式
```
Dim str As String
str = "mystring"
```

这种方式是万金油，但恶心在定义一个变量的过程被硬生生给割成 声明 和 赋值 两个步骤。

2 Set 赋值
```
Set sheet = Activeworkbook.Worksheets(1)
```

经常出现在 创建对象上，甚至 Excel 自己的帮助文档上也有这种写法。
但这时候 Set 出来的对象的类型不是你所期望的类型。比如上面的例子，从表面上看，变量 sheet 的数据类型应该是 Worksheet ，但如果用下面的代码去调用， 100%出错。错误原因：数据类型不匹配。
```
Sub Test(sheet As Worksheet)
End Sub
```

3 啥都不写的直接定义
```
str = "mystring"
```

感觉这是一种非标准的定义方式。实际效果和 2 提到的差不多。
但什么时候用2，什么时候用3，我实在分不清楚……

最后来说说 VBA 原罪中的原罪——括号。
也不知道为什么， VBA 对括号的使用，非常吝啬。“<”和“>” 只被保留了大于和小于的意思。
而其他诸如 {}、[]这些符号，也都没有被用到，所以在 VBA 程序中，真是 () 满天飞。

如果真是这样，用习惯了倒也无所谓。但真正恶心的在于， VBA 之中，调用函数/Sub 的时候，什么时候该加括号。
以 C 语言为例，定义了这样两个函数
```
int getInt(int a) {
    return a * 2;
}

void execute(int b) {
    b * 10;
}
```

在调用的时候，不管什么时候，都需要加上参数才行。
```
int main() {
    int b = getInt(2);
    execute(b);
}
```

我自然觉得这应该是惯例，或者说，只要调用了什么函数，调用就应该这么写——如果类似 Ruby 那种一开始就没括号的，也就拉倒——但 VBA 这货却偏不这样。从我目前使用 VBA 的经历来看，在调用没有返回值的 Sub / 函数上，不能加括号，而有返回值的时候必须加返回值。  
如果都不加括号，那也可以理解：这种语言就就不加括号。但一会儿加，一会儿不加，我我真心搞不明白这么设计的理由是什么？  
语言整体的统一性被破坏殆尽。