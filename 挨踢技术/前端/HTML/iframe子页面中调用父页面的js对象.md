[目录](../)
# iframe子页面中调用父页面的js对象

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
