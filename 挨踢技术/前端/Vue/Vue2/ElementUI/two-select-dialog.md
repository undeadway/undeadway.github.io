[目录](./)
# 【代码片段】two-select-dialog

```
<template>
  <el-dialog
    :title="options.title"
    :visible.sync="centerDialogVisible"
    class="dialog-comment-box"
    :width="width"
    @close="onClose"
    center>
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="onCancel">{{ options.cancelButtonText }}</el-button>
      <el-button type="primary" size="mini" @click="onCommit">{{ options.confirmButtonText }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      default: null
    },
    width: {
      tyep: String,
      default: "500px"
    }
  },
  data () {
    return {
      centerDialogVisible: false
    }
  },
  methods: {
    setVisible (flag) {
      this.centerDialogVisible = flag;
    },
    onCancel () {
      this.$emit("cancel");
    },
    onCommit () {
      this.$emit("commit");
    },
    onClose () {
        this.$emit("close");
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-comment-box .el-dialog__body {
  padding:0px !important;
}
</style>
```