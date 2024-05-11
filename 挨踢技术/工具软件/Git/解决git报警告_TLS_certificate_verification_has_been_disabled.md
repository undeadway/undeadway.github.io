[目录](./)

#  解决git报警告 TLS certificate verification has been disabled!

## 现象

![](./TLS-certificate-verification-has-been-disabled-warning.png)

## 解决方案

执行：`git config --global http.sslVerify true`

![](TLS-certificate-verification-has-been-disabled-result.png)
