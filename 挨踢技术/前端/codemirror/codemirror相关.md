[目录](./)
# codemirror相关

## 1. 导入

```
import { codemirror } from "vue-codemirror";
import 'codemirror/mode/sql/sql.js' // 这里是要进行语法高亮的代码库

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/xq-light.css";

import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint';
```

## 2. vue 代码

Vue 代码：

```
<codemirror id="cm-condition" ref="cm-condition" class="codemirror-box"
    :value="code.condition" :options="options" />
```

配置：

```
options:{
    tabSize: 2,
    mode: 'text/x-mariadb',
    theme: "xq-light",
    lineNumbers: true,
    line: true,
    readOnly: false,
    extraKeys: {"Alt-/": "autocomplete"},//按键配置
}
```

大小配置：

```
mounted () {
    this.$refs["cm-condition"].codemirror.setSize("auto", "160px");
}
```
