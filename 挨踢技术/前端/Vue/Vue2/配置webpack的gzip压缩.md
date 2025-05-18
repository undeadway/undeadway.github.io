[目录](./)
# 配置webpack的gzip压缩

## 1. 添加依赖包
```
"compression-webpack-plugin": "3.0.0"
```

## 2. 在 vue.config.js 中追加配置

```
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
// 前略

	chainWebpack: config => {
		if (process.env.NODE_ENV !== "development") {
			config.plugin("compressionPlugin")
				.use(new CompressionPlugin({
					filename: "[path].gz[query]",
					algorithm: "gzip",
					test: productionGzipExtensions,
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: true
				}));
		}
	},
}
```

重新编译后，就能得到 .gz 结尾的压缩文件了。

## 3. 修改 nginx 设置 
在 nginx.conf 的 http 中加入下面的配置
```
gzip_static on;
```

重启 nginx 。

这样就好了。
