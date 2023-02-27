[目录](./)

# 一个 http 封装

1. 封装了 http 的所有请求
2. 添加针对同一个请求在短时间内大量重复提交时的缓存处理，不至于多次向后台发送

```
/**
 * 这里封装了关于 http 请求的所有处理
 */
import axios from "axios";
import secrecy from "./secrecy";

const URL_MAP = {};
const http = axios.create({
	baseURL: "",
	timeout: ""
});

http.interceptors.request.use(
	config => {

		console.log(config);

		if (config.data) {
			config.data = secrecy.encrypt(JSON.stringify(config.data));
		}
		if (config.params) {
			config.params = secrecy.encrypt(JSON.stringify(config.params));
		}

		// // 先判断客户端是否有客户缓存信息
		const accessToken = Ls.get("ACCESS_TOKEN");
		if (!accessToken) {
			// 如果没有，且不是请求验证码以及登录请求等不需要用户信息的请求，则返回登录页

			if (config.url !== "/user/captcha" // 验证码
				&& config.url !== "/user/login" // 请求登录
			) {
				window.location.href = "/login";
			}
		}
		// 其余情况，则不做任何处理

		// TODO 在这里对 request 的数据进行加工
		// config.headers 中包含了 header 的数据，可以加工头部数据
		config.headers["Access-Control-Allow-Origin"] = "*";
		config.headers.Authorization = accessToken;

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(res => {

	const data = JSON.parse(secrecy.decrypt(res.data));

	// TODO 在这里处理掉各种错误
	if (data.code === 200) { // 成功标志
		return data.body;
	} else if (data.code === 302) {
		redirect(data);
	} else { // 如果出错，暂时不做处理
		throw new Error();
	}
});

function redirect ({message, value}) {
	// 这里可以处理警告等
	Vue.$router.replace({
		name: value.name
	});
}

function createPromise(obj, method, url, data) {

	let promise = obj.promise = new Promise((resolve, reject) => {
		http[method](`${url}`, data)
			.then((res) => {
				obj.done = true; // 在请求完毕后，设置 done = false 可以再次被调用
				resolve(res);
			})
			.catch((err) => {
				obj.done = true;
				reject(err);
			});
	});

	return promise;
}

function getData(method, url, data) {

	let obj = URL_MAP[url], param = JSON.stringify(data);
	let promise = null;

	if (!obj) {
		// map 中没有对应的 promise 时，创建 promise
		URL_MAP[url] = obj = {};
		let reqObj = obj[param] = {
			done: false
		};

		promise = createPromise(reqObj, method, url, data);
	} else {
		let reqObj = obj[param];
		if (reqObj) {
			if (reqObj.done) { // 当 promise 的 done = true 时，创建新的 promise
				reqObj.done = false;
				promise = createPromise(reqObj, method, url, data);
			} else {
				promise = reqObj.promise;
			}
		} else {
			obj[param] = reqObj = {};
			promise = createPromise(reqObj, method, url, data);
		}
	}

	return promise;
}


/**
 * 解决 GET 请求时,如果第二个参数不为 params, 需要转写成 { params: {} }
 * @param  {...any} args
 */
http.prototype.constructor.get = (...args) => {
	if (args[1] && typeof args[1] === "object" && !args[1].params) {
		args[1] = { params: args[1] };
	}
	return http.call(this, ...args);
};

export default {
	get: (url, data) => {
		return getData("get", url, data);
	},
	post: (url, data) => {
		return getData("post", url, data);
	},
	put: (url, data) => {
		return getData("put", url, data);
	},
	del: (url, data) => {
		return getData("delete", url, data);
	}
};
```