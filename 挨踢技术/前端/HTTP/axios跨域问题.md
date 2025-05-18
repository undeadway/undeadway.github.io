[目录](./)
# axios跨域问题

post 请求用 formdata 没有任何问题
```
config.headers.Accept = 'multipart/form-data'
config.data = secrecy.toFormData(enryptData)
```

但是一旦把formdata的设置删掉，立刻跨域。

>  Access to XMLHttpRequest at 'http://ip.ip.ip.ip:8004/sys-oauth2/oauth/token' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.  
> http.js?b1d0:108 Error: Network Error  
>     at createError (createError.js?2d83:16)  
>     at XMLHttpRequest.handleError (xhr.js?b50d:83)


查了一下发现 formdata 默认允许跨域：[https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

> The only allowed values for the Content-Type header are:
>
>    application/x-www-form-urlencoded  
>    multipart/form-data  
>    text/plain
