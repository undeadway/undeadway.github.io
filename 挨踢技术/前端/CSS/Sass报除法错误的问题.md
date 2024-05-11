[目录](./)
# Sass报除法错误的问题

提示：
```
DEPRECATION WARNING: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.

Recommendation: math.div($--tooltip-arrow-size, 2)

More info and automated migrator: https://sass-lang.com/d/slash-div

   ╷
70 │     margin-bottom: #{$--tooltip-arrow-size / 2};
   │                      ^^^^^^^^^^^^^^^^^^^^^^^^^
   ╵
    node_modules/element-ui/packages/theme-chalk/src/popper.scss 70:22         @content
    node_modules/element-ui/packages/theme-chalk/src/mixins/mixins.scss 74:5   b()
    node_modules/element-ui/packages/theme-chalk/src/popper.scss 4:1           @import
    node_modules/element-ui/packages/theme-chalk/src/select-dropdown.scss 3:9  @import
    node_modules/element-ui/packages/theme-chalk/src/select.scss 4:9           @import
    node_modules/element-ui/packages/theme-chalk/src/pagination.scss 4:9       @import
    node_modules/element-ui/packages/theme-chalk/src/index.scss 2:9            @import
    stdin 2:9                                                                  root stylesheet

```

报错的原因是除法有精度问题，所以被禁用了。  
这时候，只要把 `/ 2` 的操作改成 ` *0.5` 就可以了。