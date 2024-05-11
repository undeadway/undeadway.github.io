[目录](./)
# 上传文件buffer错误

上传文件处理的代码：

```
const chunks = [], size = 0;
req.on("data", (chunk) => {
	chunks.push(chunk);
	size += chunk.length;
}).
	on("end", () => {
	let buffer = Buffer.concat(chunks , size); //  这里出错了
});
```

错误：
```
The "list[0]" argument must be an instance of Buffer or Uint8Array. Received type string ('------------------------...)
/home/waygc/workspace/mircore/node_modules/coralian/src/lib/logger.js:27
[21YY-08-06 15:03:11.373] ERROR TypeError [ERR_INVALID_ARG_TYPE]: The "list[0]" argument must be an instance of Buffer or Uint8Array. Received type string ('------------------------...)
    at Function.concat (buffer.js:573:13)
    at Object.get (/home/waygc/workspace/mircore/src/core/file.js:30:24)
    at IncomingMessage.<anonymous> (/home/waygc/workspace/mircore/src/core/server.js:61:25)
    at IncomingMessage.emit (events.js:327:22)
    at endReadableNT (_stream_readable.js:1221:12)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
```