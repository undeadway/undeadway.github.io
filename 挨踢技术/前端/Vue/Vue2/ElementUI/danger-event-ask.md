[目录](./)
# 【代码片段】danger-event-ask

本组件是用于在某些具有风险性的场合下，弹出一个确认框。  
只有当输入正确的随机码之后，才能继续操作。  
当关闭对话框，或者点击“放弃”时，则认为不执行危险操作。

以助于降低误操作的发生。

此通能已集成至 [modell-vue2-frame](https://tech-demo.waygc.net/vue2-frame/#/?danger-event-confirm)

```
<template>
  <div>
    <h2 class="danger-event-ask-title">
      <div><i class="el-icon-warning"></i></div>
      <div>这是一个危险的操作！</div>
    </h2>
    <div style="margin:10px 0px;">您真的要{{ message }}么？</div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item :label="`请输入随机码 ${ randCode } 进行危险操作确认`" prop="inputRandCode">
        <el-input v-model="form.inputRandCode" size="mini" palaceholder="请输入随机码" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const BASE_STR = "23456789_?!ABCDEFGHJK+=-LMNPQRSTUVWXYZ@#$%&abcdefghijkmnopqrstuvwxyz";

export default {
  props: {
    message: {
      type: String,
      default: "进行当前操作"
    }
  },
  data () {
    return {
      randCode: "",
      form: {
        inputRandCode: ""
      },
      rules: {
        inputRandCode: [
          { required: true, trigger: "blur", message: "请输入随机码" },
          {
            validator: (rule, value, callback) => {
              if (this.form.inputRandCode !== this.randCode) {
                callback("输入的随机码错误");
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    }
  },
  created () {
    this.createRandCode();
  },
  methods: {
    createRandCode (length) {
      let code = [];
      length = length || 10;
      for (let i = 0; i < length; i++) {
        let index = Math.trunc(Math.random() * BASE_STR.length);
        if (index >= BASE_STR.length) {
          index = BASE_STR.length - 2;
        }
        code[i] = BASE_STR[index];
      }
      this.randCode = code.join("");
    },
    validate (callback) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          callback();
        }
      });
    },
    clear () {
      this.form.inputRandCode = "";
      this.$refs.form.clearValidate(["inputRandCode"]);
    }
  }
}
</script>
<style lang="scss" scoped>
.danger-event-ask-title {
  color:#F56C6C;
  font-weight: bold; 
  
  div {
    display: inline-block;
    vertical-align:middle;
  }
  div:first-child {
    font-size: 28px;
    margin-right: 5px;
  }
}
</style>
```