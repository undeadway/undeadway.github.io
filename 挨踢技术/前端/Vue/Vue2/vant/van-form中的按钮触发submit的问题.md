[目录](./)

# van-form中的按钮触发submit的问题

## 现象

有这样的代码

```
<van-form @submit="onSubmit" ref="editForm">
	<van-field
		name="mphone"
		v-model="editData.mphone"
		label="手机号"
		placeholder="请输入手机号"
		:rules="rules.mphone"
	>
		<template #button>
			<van-button size="small" @click="onSendSms" type="primary">校验短信</van-button>
		</template>
	</van-field>
</van-form>
```

> type 属性规定按钮的类型。  
> 提示：请始终为按钮规定 type 属性。**Internet Explorer 的默认类型是 “button”，而其他浏览器中（包括 W3C 规范）的默认值是 “submit”**。

但不知道为什么，在按下内部的 `van-button` 的时候，也同时触发了外部 `van-form` 上定义的 `onSubmit` 事件。

## 解决方案

修改方案是给 `van-button` 加上 `native-type="button"`。

## 参考
[https://blog.csdn.net/qq_43379916/article/details/119184218](https://blog.csdn.net/qq_43379916/article/details/119184218)