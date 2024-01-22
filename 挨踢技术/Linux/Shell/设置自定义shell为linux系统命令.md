[目录](./)
# 设置自定义 shell 为 linux 系统命令

```
#!/bin/bash

if [ $1 = '-?' ]; then
	echo 'help'
else
	if [ -a $1 ]; then
		chmod 755 $1.sh
		sudo ln -s /home/mine/mysh/$1.sh /usr/bin/$1
	else
		echo "$1.sh not exists"
	fi
fi
```