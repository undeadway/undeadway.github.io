[目录](./)
# git一键提交

因为某些原因，要经常在 github、公司内部服务器之间切换来切换去，而且公司内部的服务器还没法 ssh，每次都要登陆输入账密，不胜其烦。
所以写了下面的脚本，每次可以只要输入一点点内容就可以自动提交。

半成品，还没写完。

```
#!/bin/bash

##########################
###
### 目的：一个在每次命令行操作 git 的时候，不需要重复输入用户名、密码的脚本
### 操作包括 git 的全部操作，以及自定义操作
###
### 注意：
### 1. 该脚本使用前，必须先 cd 到对应的工程目录下
###
###
###
### 自定义操作
### 命令名  参数          参数解释
### set     repository      仓库
###         username      用户名
###         password      密码
###         project        项目
###         lbranch        本地分支
###         rbranch        远程分支
###########################

if [ ! -n "$1" ]; then
	echo "请输入参数"
	exit
fi

configFile="${HOME}/.mygit.config"

if [ $1 = '-?' ];then
	echo 'help'
elif [ $1 = 'set' ]; then
	[ -e $configFile ]
	confFileExists=$?
	if [[ $confFileExists -ne 0 ]]; then
		touch $configFile
	fi

	# 获得配置信息
	repository=$2 # 仓库名
	username=$3 # 用户名
	password=$4 # 密码
	project=$5 # 项目名
	lbranch=$6 # 本地分支
	rbranch=$7 # 远程分支
	readLine=''

	if [ ! -n "$lbranch" ]; then
		lbranch='master'
	fi

	if [ ! -n "$rbranch" ]; then
		rbranch=$lbranch
	fi
	# 先判断 repository 是否存在
	while read line
	do
		if [ "$line" = '' ]; then
			continue
		fi

		array=(${line// / })
		if [ "${array[0]}" = "$repository" ] && [ "${array[3]}" = "$project" ]; then
			readLine=$line
			break
		fi
	done < $configFile

	output="${repository} ${username} ${password} ${project} ${lbranch} ${rbranch}"
	if [ ! -n "$readLine" ]; then
		#不存在则直接添加数据到文件
		echo "$output" >> $configFile
	else
		# 如果存在，则提示是否需要覆盖
		read -p "仓库：${repository} 、项目：${project} 的配置已经存在，是否要覆盖？（y/n）：" input
			case $input in
				[yY]) # 大小写的 Y 都可以
					sed -i "s/$readLine/$output/g" $configFile
					;;
				# y 以外，不管输入什么都当是不要处理
			esac
	fi
else
	# 定义配置
	inputStr="$@ " # 为了正则表达式的正确运行，最后加一个空格
	repository=$2 # 仓库
	project=$3 # 项目
	username='' # 用户名
	password='' # 密码 
	readExist=false

	getPara(){
		paraVal=`expr "$inputStr" : "$1"`
		size=`expr length "$paraVal"`
		cut=`expr $size - $2`
		start=`expr $2 + 1`
		sub=`expr substr "$paraVal" $start $cut`
		echo "$sub"
	}

	lbranch=`getPara '.*\(\-lb [^\-]* \)' 4`
	rbranch=`getPara '.*\(\-rb [^\-]* \)' 4`
	origin=`getPara '.*\(\-o [^\-]* \)' 3`
	commit=`getPara '.*\(\-m [^\-]* \)' 3`

	if [ ! -n "$commit" ]; then
		commit='commit'
	fi

	while read line
	do
		if [ "$line" = '' ]; then
			continue
	fi

		array=(${line// / })
		if [ "${array[0]}" = "$repository" ] && [ "${array[3]}" = "$project" ]; then
			readExist=true
			username=${array[1]}
			password=${array[2]}

			# 如果没有传入相关参数，则采用默认配置好的值
			if [ ! -n "$lbranch" ]; then
				lbranch=${array[4]}
			fi
			if [ ! -n "$rbranch" ]; then
				rbranch=${array[6]}
			fi
			if [ ! -n "$origin" ]; then
				origin=${array[5]}
			fi

			break
		fi
	done < $configFile

	if [ !readExist ]; then
		echo "仓库：${repository} 、项目：${project} 的配置未定义，请先定义配置。"
		exit
	fi

	if [ $1 = 'pull' ]; then
		git pull
	elif [ $1 = 'push' ]; then
		git checkout $lbranch
		git add .
		git commit -m "$commit" # 输入的注释
		git push $origin $rbranch
	else
		echo '非法的操作'
	fi
fi
```