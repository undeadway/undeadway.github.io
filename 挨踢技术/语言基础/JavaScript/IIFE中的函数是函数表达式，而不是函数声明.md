[目录](./)
# IIFE中的函数是函数表达式，而不是函数声明

下面的代码打印什么内容，为什么？

```
var b = 10;
(function b(){ b = 20; console.log(b); 
})();
```
针对这题，在知乎上看到别人的回答说：

>1. 函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。
>2. 对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。
>3. IIFE中的函数是函数表达式，而不是函数声明。

实际上，有点类似于以下代码，但不完全相同，因为使用const不管在什么模式下，都会TypeError类型的错误
```
const foo = function () {
  foo = 10;
  console.log(foo)
}
(foo)() // Uncaught TypeError: Assignment to constant variable.
```
几个例子：
```
var b = 10;
(function b() {
   // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
   // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
    b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 10，不是20
})();
```
所以严格模式下能看到错误：`Uncaught TypeError: Assignment to constant variable`
```
var b = 10;
(function b() {
  'use strict'
  b = 20;
  console.log(b)
})() // "Uncaught TypeError: Assignment to constant variable."
```
其他情况例子：

有`window`：
```
var b = 10;
(function b() { window.b = 20; console.log(b); // [Function b] console.log(window.b); // 20是必然的
})();
```
有`var`:
```
var b = 10;
(function b() { var b = 20; // IIFE内部变量 console.log(b); // 20 console.log(window.b); // 10 
})();
```

抄自：[https://www.cnblogs.com/wangxi01/p/11209060.html](https://www.cnblogs.com/wangxi01/p/11209060.html)