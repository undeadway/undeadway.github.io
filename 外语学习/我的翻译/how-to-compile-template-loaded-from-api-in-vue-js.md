[目录](./)

# Vue.js 怎么编译 用 API 加载的模板（template）

## 正文

我们最近有个不太常见的任务。我们要去从数据库中拿 Vue 的组件模板。这对直接画 HTML 来说非常简单，使用 `v-html` 命令就可以了。无论怎么我们去动态渲染 HRML 代码的哪个部分都可以。

我们加个通过 `GET` 从后端取得到数据，并返回了一个带有模板和客户数据集的对象：

```
{
    "template": "<el-table :data='datasets' stripe>
        <el-table-column prop='firstName' label='First name' sortable></el-table-column>
        <el-table-column prop='lastName' label='Last name'></el-table-column>
        <el-table-column prop='email' label='e-mail'></el-table-column>
    </el-table>",
    "datasets": [
        {"firstName": "John", "lastName": "Doe", "email": "johndoe@email.com"},
        {"firstName": "Mark", "lastName": "Spencer", "email": "markspencer@email.com"}
    ]
  }
```

就像你看到的，模板是用的 element-ui 库，还绑定了字段定义。数据源是非常简单的客户数据的列表。

 

## 原文

[https://nubisoft.io/blog/how-to-compile-template-loaded-from-api-in-vue-js/](https://nubisoft.io/blog/how-to-compile-template-loaded-from-api-in-vue-js/)