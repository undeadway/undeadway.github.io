父页面：
```
function todo () {
    console.log("todo");
}
window.todo = todo;
```
子页面
```
window.partent.todo(); // todo
```
