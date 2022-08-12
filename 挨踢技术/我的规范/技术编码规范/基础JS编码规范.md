[目录](./)
# 基础 JS 编码规范

1\. 文件名全部采用小写字母，有多个词时用下划线连接，如：`this_is_demo.js`；
2\. 每行代码结束都必须加 “`;`”（**此为强制规定**）；
3\. 无论任何时候都不要使用 `var`（**此为强制规定**），用 `let` / `const` 代替；
4\. 如无特殊情况，数组、对象、函数、不要用 `new`，直接使用字面量来初始化，如：

```
  let a = [];               √
  let o = {};               √ 
  function f() {};          √

  let a = new Array();      X
  let o = new Object();     X
  let f = new Function();   X
```
5\. 函数尽量不要用 `new` 来实例化对象，可以直接返回对象的字面量，如：

```
  function getObj() {
    return {};
  }
  let o = getObj();
```

6\. 如无特殊情况，所有代码禁止使用 `==` ，全部使用 `===` ；
7\. `require` 进来的包，必须用 `const` 来定义，如：
```
const fs = require("fs");
```
8\. 尽量少用异步操作，用 `async` / `await` 的同步方式来替代；
9\. 一个变量尽可能只负责一种数据类型，不要随意变更，如：

```
let abc = "A,B,C";
abc = abc.split(",");           X

let absStr = "A,B,C";
let abcLst = abcStr.split(",")  √
```
10\. 不同数据类型间的赋值，必须通过显示数据类型转换，如：

```
let aNum = 1;
let sStr = aNum;                X

let aNum = 1;
let aStr = String(aNum)         √
```
11\. 如无必要，同一个变量不得赋值为多种数据类型（**此为强制规定**），如：

```
let chars = "a,b,c";
chars = chars.split(",");               X

let chars = "a,b,c";
let charArr = chars.split(",");         √
```