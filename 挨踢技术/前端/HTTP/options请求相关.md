[目录](./)
# options请求相关

有时候发送请求时浏览器会先发送一个options请求，成功后再发送真正的请求。

跨域请求中，options请求是浏览器自发起的preflight request(预检请求)，以检测实际请求是否可以被浏览器接受。

[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 里有详细描述，不太好懂……
