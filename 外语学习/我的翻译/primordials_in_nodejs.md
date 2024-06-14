[目录](./)

# Node.js 中的 Primordials

## 翻译

如果你是个非常好奇心的程序员，并且喜欢读源代码。而且你刚好读过 Node.js 的源代码的时候，你或许会发现一个叫 `primordial` 的东西，并会看到这么用。

```
const {
  ObjectCreate,
  ObjectDefineProperty,
  RegExp,
  RegExpPrototypeExec,
  SafeArrayIterator,
  StringPrototypeToLowerCase,
  StringPrototypeToUpperCase,
} = primordials;
```

你进入 REPL 然后点击 primordials ，然后给出提示：`Uncaught ReferenceError: primordials is not defined` 。

所以，这 primordials 到底是什么？

## 原文

* [https://h3manth.com/posts/primordials-in-node/](https://h3manth.com/posts/primordials-in-node/)