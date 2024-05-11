[目录](./)
# ENOSPC错误

今天在执行 `yarn serve` 命令的时候出现了下面的错误
```
waygc@waygc-PC:~/workspace/swid-frontend$ yarn serve
yarn run v1.22.10
$ vue-cli-service serve
 INFO  Starting development server...
10% building 2/2 modules 0 activeevents.js:292
      throw er; // Unhandled 'error' event
      ^

Error: ENOSPC: System limit for number of file watchers reached, watch '/home/waygc/workspace/swid-frontend/public/assets'
    at FSWatcher.start (internal/fs/watchers.js:169:26)
    at Object.watch (fs.js:1415:11)
    at createFsWatchInstance (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:38:15)
    at setFsWatchListener (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:81:15)
    at FSWatcher.NodeFsHandler._watchWithNodeFs (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:233:14)
    at FSWatcher.NodeFsHandler._handleDir (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:429:19)
    at FSWatcher.<anonymous> (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:477:19)
    at FSWatcher.<anonymous> (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:482:16)
    at FSReqCallback.oncomplete (fs.js:168:5)
Emitted 'error' event on FSWatcher instance at:
    at FSWatcher._handleError (/home/waygc/workspace/swid-frontend/node_modules/chokidar/index.js:260:10)
    at createFsWatchInstance (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:40:5)
    at setFsWatchListener (/home/waygc/workspace/swid-frontend/node_modules/chokidar/lib/nodefs-handler.js:81:15)
    [... lines matching original stack trace ...]
    at FSReqCallback.oncomplete (fs.js:168:5) {
  errno: -28,
  syscall: 'watch',
  code: 'ENOSPC',
  path: '/home/waygc/workspace/swid-frontend/public/assets',
  filename: '/home/waygc/workspace/swid-frontend/public/assets'
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
waygc@waygc-PC:~/workspace/swid-frontend$ ^C
```

执行以下命令：
```
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf 
$ sudo sysctl -p
```

参考以来源：[https://blog.csdn.net/qq_38106692/article/details/101512232](https://blog.csdn.net/qq_38106692/article/details/101512232)