[目录](./)
# IE8兼容hack

CSS 在属性最后加上 `\9` 可以作为专属于 ie8 处理的 hack 。

```
 .edui-icon {
    height: 20px !important;
    width: 20px !important;
    background-image: url(../images/icons.png); /** 其他浏览器 */
    background-image: url(../images/icons.gif) \9; /** IE7、IE8、IE9 */
}
```