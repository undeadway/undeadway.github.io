[目录](./)
# 【代码片段】date-range-select

```
<template>
  <el-date-picker
    v-bind="elProps"
    v-model="timeSelect"
    @change="onChange"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="timestamp"
  ></el-date-picker>
</template>
<script>
export default {
  props: {
    elProps: {
      type: Object,
      default: () => {}
    },
    start: {
      type: [String, Number],
      default: ''
    },
    end: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      timeSelect: ''
    }
  },
  watch: {
    start (v) {
      // 重置表单时触发
      if (!v && !this.end) {
        this.timeSelect = ''
      }
      // 详情回显
      if (v && this.end && !this.timeSelect) {
        this.timeSelect = [v, this.end]
      }
    }
  },
  methods: {
    onChange (v) {
      if (v?.length) {
        const start = $moment(v[0]).valueOf()
        const end = $moment(v[1]).valueOf()
        this.$emit('update:start', start)
        this.$emit('update:end', end)
      } else {
        this.$emit('update:start', '')
        this.$emit('update:end', '')
      }
      this.$emit('change')
    }
  }
}
</script>
```