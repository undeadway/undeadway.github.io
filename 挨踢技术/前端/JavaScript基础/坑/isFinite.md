[目录](./)
# isFinite

众所周知，isFinite 是 JS 中的一个全局函数。
MDN上有这样的说明

> 用这个方法来判定一个数字是否是有限数字。isFinite 方法检测它参数的数值。如果参数是 NaN，正无穷大或者负无穷大，会返回false，其他返回 true。


例子如下：
```
isFinite(Infinity);  // false
isFinite(NaN);       // false
isFinite(-Infinity); // false
isFinite(0);         // true
isFinite(2e64);      // true
isFinite("0");       // true, would've been false with the more robust Number.isFinite("0")
```

看起来挺不错的。  
但如果仔细再看一遍，会发现概要是这么描述的。

> 该全局 isFinite() 函数用来判断被传入的参数值是否为一个有限数值（finite number）。在必要情况下，参数会首先转为一个数值。

嗯？这在必要情况下，参数会首先转为一个数值。是什么鬼？  
因为有疑问，所以特意去翻了英文版的MDN，结果好，示例代码中多了一行。  

```
isFinite(Infinity);  // false
isFinite(NaN);       // false
isFinite(-Infinity); // false
isFinite(0);         // true
isFinite(2e64);      // true
isFinite(null);      // true   <- 这行是中文版没有


isFinite("0");       // true, would've been false with the
                   // more robust Number.isFinite("0")
```

再联想之前的那句“在必要情况下，参数会首先转为一个数值”，难道 isFinite 在执行的时候会做隐式数据类型转换？
测试之，结果不幸言中。
```
isFinite(null);      // true
isFinite(undefined);      // false
isFinite('');      // true
isFinite(' ');      // true
isFinite('\t');      // true
isFinite('\n');      // true
isFinite(false);      // true
sFinite(true);      // true
```

看到上面的结果，我真觉得挺害怕的。
解决方案？
那就是写一个自己的函数，在执行 isFinite 之前把上面这些隐式数据类型转换可能造成的问题全部先排除掉。
```
function myIsFinite(number) {
    if (number === null || number === true || number === false) {
        eturn false;
    }

    if (number !== number) {
        return false;
    }

    if ((number).toString().trim().isEmpty()) {
        return false;
    }

    return isFinite(number);
}
```

于是还是要在这里吼上一声：JS 中不要用 ==，任何地方、任何时候都用 === 。