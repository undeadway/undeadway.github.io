[目录](./)
# LabelToopTip

## 说明

因为 antd 的 tooltip 控件不支持过长不显示，所以自己写了一个超过一定数量的文字之后不显示的封装。
通过 start 和 end 两个参数来实现左截取，右截取，中间截取等不同模式

* 左截取
代码

```
<LabelToolTip :label="一二三四五上山打老虎老虎没打到打到小松鼠" :end="15" />
```

输出
>...上山打老虎老虎没打到到打到小松鼠

* 右截取
代码

```
<LabelToolTip :label="一二三四五上山打老虎老虎没打到打到小松鼠" :start="15" />
```

输出
>一二三四五上山打老虎老虎没打到...

* 中间截取
代码

```
<LabelToolTip :label="一二三四五上山打老虎老虎没打到打到小松鼠" :start="7" :end="7" />
```

输出
>一二三四五上山...打到打到小松鼠

## 代码
```
<template>
  <div>
    <div v-if="izShowAll">{{value}}</div>
    <a-tooltip v-else placement="topRight">
      <template slot="title">
        <span>{{label}}</span>
      </template>
      <span>{{value}}</span>
    </a-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    start: {
      type: Number,
      default: null
    },
    end: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      value: "",
      izShowAll: false
    }
  },
  created () {
    this.load();
  },
  methods: {
    reLoad (value) {
      this.value = value;
      this.load();
    },
    load () {
      /**
       * start 和 end 表示 添加 ... 的方式
       * 当 start > 0 且 没有 end，表示 start 右侧的字符 ...
       * 例子： lebel=一二三四五上山打老虎， start=4 = >一二三四...
       * end < label.length  且没有 start 时 表示 end 左侧的字符 ...
       * 例子： lebel=一二三四五上山打老虎， end=4 => ...山打老虎
       * 当 start > 0 且 end < label.length 时，表示 start 和 end 中间的 字符 ...
       * 例子： lebel=一二三四五上山打老虎， start=3, end=3 => 一二三...打老虎
       */
      console.log(this.start, this.end, this.label);
      const value = this.value ? this.value : (this.label || "");
      const length = value.length;

      if (this.start === 100) {
        console.log(12444);
      }

      if (this.start === null && this.end === null) {
        this.izShowAll = true;
        this.value = value;
      } else if (this.end === null) {
        // 当 start > 0 且 没有 end，表示 start 右侧的字符 ...
        // 例子： lebel=一二三四五上山打老虎， start=4 = >一二三四...
        if (this.start > 0 && this.start < length) {
          this.izShowAll = false;
          this.value = value.slice(0, this.start)+ "...";
        } else {
          this.izShowAll = true;
          this.value = value;
        }
      } else if (this.start === null) {
        if (this.end < length - 1) {
          this.izShowAll = false;
          this.value = "..." + value.slice(length - this.end);
        } else {
          this.izShowAll = true;
          this.value = value;
        }
      } else {
        if (this.start + this.end > length ) {
          this.izShowAll = true;
          this.value = value;
        } else if (this.start > 0 && this.end < length - 1) {
          this.izShowAll = false;
          let p1 = value.slice(0, this.start);
          let p2 = value.slice(length - this.end);
          this.value = p1 + "..." + p2;
        } else {
          this.izShowAll = true;
          this.value = value;
        }
      }
    }
  }
};
</script>
```
