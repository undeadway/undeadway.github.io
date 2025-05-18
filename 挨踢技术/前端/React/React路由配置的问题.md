[目录](./)

# React路由配置的问题

```
 { path: '/accidents', exact: true, component: Accidents },
 { path: '/accidents/add', component: AccidentsEdit },
```

类似上面这样有子路由的，一定要记得加 `exact: true` ，不然路由就无法跳到子路由上面去。