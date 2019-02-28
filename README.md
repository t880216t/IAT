# IAT
这是一个web版的接口测试平台，旨在“简单配置、系统运行”的去做互联网接口测试。

详情见：[基于 Jmeter 的 web 端接口自动化测试平台](https://testerhome.com/topics/17986)
更多的测试技术及工具使用，欢迎进群交流：
![](https://testerhome.com/uploads/photo/2019/80beba6b-1412-45a2-8a9d-394da51a63fb.jpg!large)

## 安装

### 前提：
- 一个已经在跑的MySQL数据库
- 有个IAT库已经导入项目sql

有特殊网络要求的，可以download代码编译部署。如果服务器能连上外网，可以直接通过我已经封装的docker镜像安装。
### 方法1：Docker镜像安装
- 我的镜像中开启了ssh服务，你可以通过挂载宿主机的一个端口来登录容器，默认账号为：root，密码为：root
- 前端我挂载的是8089，看个人需要设置
- 命令行末尾参数，需要指定已经配置好的MySQL

优化了原来的容器时区问题，已经启动了的同学也不必担心，把原来的容器停止后，再创建个新的即可，数据是取得数据库，不会变。
``` bash
# docker run --env PATH=/root/apache-jmeter-5.0/bin:$PATH -t -i -d -p 8089:80 -p 9022:22 --name=iat6 ownerworld/iat:0.0.6  /bin/start.sh "root:root@127.0.0.1:3306"
```

### 方法2：编译安装
这种需要你有一定的运维基础和开发经验。默认你已有node和python环境。
#### 下载代码
```
$ git clone https://github.com/t880216t/IAT.git
```
#### 安装前端依赖
```
$ cnpm i
```
#### 打包前端
```
$ npm run build
```
生成的dist文件夹便是前端部署文件
#### 后端
服务端代码在server文件夹中，用的python flask框架不需要打包，建议用gunicorn启动。(确保你已经在server文件夹中)
```
$ pip install -r requirements.txt
$ gunicorn -w4 -b 0.0.0.0:5000 run:app
```
