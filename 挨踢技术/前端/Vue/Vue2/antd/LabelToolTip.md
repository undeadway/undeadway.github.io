[目录](./)
# LabelToopTip

## 说明
因为 antd 的 `tooltip` 控件不支持过长不显示，所以自己写了一个超过一定数量的文字之后不显示的封装。

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
    cut: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      value: "",
      izShowAll: false
    }
  },
  created () {
    if (!!this.label) {
      this.izShowAll = this.label.length <= this.cut;
    } else {
      this.izShowAll = true;
    }
    if (this.izShowAll) {
      this.value = this.label;
    } else {
      this.value = this.label.slice(0, this.cut) + "...";
    }
  }
};
</script>
```
