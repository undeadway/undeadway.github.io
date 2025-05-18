[目录](./)
# 基础 JS 编码规范

1\. 文件名全部采用小写字母，有多个词时用下划线连接，如：`this_is_demo.js`；
2\. 每行代码结束都必须加 “`;`”**【此项为强制规定】**；
3\. 无论任何时候都不要使用 `var`，用 `let` / `const` 代替**【此项为强制规定】**；
4\. 如无特殊情况，数组、对象、函数、不要用 `new`，直接使用字面量来初始化，如：

```
  let a = [];               √
  let o = {};               √ 
  function f() {};          √
  const f = function() {};  √

  let a = new Array();      X
  let o = new Object();     X
  let f = new Function();   X
```
5\. 函数尽量不要用 `new` 来实例化对象，可以直接返回对象的字面量，如：

```
  function getObj() {
    return {};
  }
  let o = getObj();         √ 

  function Obj() {
  }
  let o = new Obj();        X 
```

6\. 如无特殊情况，所有代码禁止使用 `==` ，全部使用 `===` **【此项为强制规定】**；

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
11\. 如无必要，同一个变量不得赋值为多种数据类型**【此项为强制规定】**，如：

```
let chars = "a,b,c";
chars = chars.split(",");               X

let chars = "a,b,c";
let charArr = chars.split(",");         √
```

12\. 一个指示符同时声明多个变量的时候，每行一个，并且第二个对其第一个，且**数据类型最好也保持一致**，如：

```
let str1 = "1",   
    str2 = "2";       √
let str1 = "1",   
  num2 = 2;       X

const arr1 = [],
      arr2 = [];      √

const arr1 = [],
    arr2 = [];       X
```
13\. 字符串不得使用单引号，全部使用双引号**【此项为强制规定】**；

14\. 拼接字符串时，尽量少用 `+` 而采用模板（`因为${s1}而${s2}`）形式；