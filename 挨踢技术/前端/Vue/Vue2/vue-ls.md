[目录](./)
# vue-ls

Vue-ls 是 Vue 的一个插件，用于操作 Local Storage(本地存储)、Session Storage(会话存储)、Memory(内存存储)。

### 定义
```
import Vue from "vue";
import Storage from "vue-ls";

const storageOptions = {
	namespace: 'vue__', // key prefix
	name: 'ls', // name variable Vue.[ls] or this.[$ls],
	storage: 'local', // storage name session, local, memory
}

Vue.use(Storage, storageOptions);
```

### 使用
```
	methods: {
		methodName () {
			Vue.ls.set("name", "value");
			this.$ls.get("name");
		}
	}
```