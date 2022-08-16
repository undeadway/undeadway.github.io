[目录](./)
# 一个 http 的封装

```
/**
 * 这里封装了关于 http 请求的所有处理
 */
import axios from "axios";

const map = {};

function createPromise(method, url, params) {
	let promise = new Promise(async (resolve, reject) => {
		axios[method](`${process.env.VUE_APP_HTTP_API}/${url}`, params)
			.then(resolve)
			.catch(reject);
	});
	return promise;
}

function getData(method, url, params) {

	let promise = null;
	let obj = map[url],
		strPram = JSON.stringify(params);

	if (!obj) {
		obj = {};

		promise = createPromise(method, url, params);
		obj[strPram] = promise;
		map[url] = obj;
	} else {
		if (obj[strPram]) {
			promise = obj[strPram];
		} else {
			promise = createPromise(method, url, params);
			obj[strPram] = promise;
		}
	}

	return promise;
}

export default {
	get: (url, params) => {
		return getData("get", url, params);
	},
	post: (url, params) => {
		return getData("post", url, params);
	},
	put: (url, params) => {
		return getData("put", url, params);
	},
	del: (url, params) => {
		return getData("delete", url, params);
	}
};
```