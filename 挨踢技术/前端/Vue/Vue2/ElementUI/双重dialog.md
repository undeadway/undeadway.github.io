[目录](./)
# 双重dialog

在内部的 diaolog 上添加 `append-to-body` 属性就可以了。

实例:
```
<el-dialog title="个人中心"
	append-to-body
	destroy-on-close :close-on-press-escape="false" :close-on-click-modal="false"
	:visible.sync="editUserDialogVisible" @close="closeEdit">
	<profile @close-edit-modal="closeEdit(true)"></profile>
</el-dialog>
```
