[目录](./)
# nodejs自动安装脚本

操作步骤：
1. 把下载下来的二进制压缩包和 `gnpm.sh` 放在同一个目录下；
2. 执行下面的主体文件

#### 主文件

```
#!/bin/bash

tar zxf node-v12.17.0-linux-x64.tar.gz
cp ./gnpm.sh ./node-v12.17.0-linux-x64
chmod 755 ./node-v12.17.0-linux-x64/gnpm.sh

sudo rm -rf /opt/node-v12.17.0-linux-x64
sudo cp -r ./node-v12.17.0-linux-x64 /opt

sudo rm -rf /usr/bin/node
sudo rm -rf /usr/bin/npx
sudo rm -rf /usr/bin/npm
sudo rm -rf /usr/bin/cnpm
sudo rm -rf /usr/bin/yarn
sudo rm -rf /usr/bin/gnpm

sudo ln -s /opt/node-v12.17.0-linux-x64/bin/node /usr/bin/
sudo ln -s /opt/node-v12.17.0-linux-x64/bin/npm /usr/bin/
sudo ln -s /opt/node-v12.17.0-linux-x64/bin/npx /usr/bin/
sudo ln -s /opt/node-v12.17.0-linux-x64/gnpm.sh /usr/bin/gnpm

cd ~

npm config set registry https://registry.npm.taobao.org

gnpm install cnpm
gnpm install yarn
gnpm install webpack
gnpm install webpack-cli
```

#### gnpm.sh
```
#!/bin/bash

sudo rm -rf /usr/bin/$2
sudo npm -g $1 $2 # $1 = 动作（install、uninstall） ; $2 = 模块名

sudo ln -s /opt/node-v12.17.0-linux-x64/bin/$2 /usr/bin/

```