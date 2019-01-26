# IAT
这是一个web版的接口测试平台，旨在“简单配置、系统运行”的去做互联网接口测试。

详情见：[基于 Jmeter 的 web 端接口自动化测试平台](https://testerhome.com/topics/17963)

### 前提：
- 一个已经在跑的MySQL数据库
- 有个IAT库已经导入项目sql

有特殊网络要求的，可以download代码编译部署。如果服务器能连上外网，可以直接通过我已经封装的docker镜像安装。
### 方法1：Docker镜像安装
- 我的镜像中开启了ssh服务，你可以通过挂载宿主机的一个端口来登录容器，默认账号为：root，密码为：root
- 前端我挂载的是8089，看个人需要设置
- 命令行末尾参数，需要指定已经配置好的MySQL
- 因容器时区默认为UTC时间，我通过挂载宿主机的时间设置来保持同步，不同的服务器挂载文件不同，见下方。

#### MAC 环境安装
注意：不同版本的机器这个地址可能不一样。自己cd进去确认下： /private/var/db/timezone/tz/2018i.1.0/zoneinfo/Asia/Shanghai
``` bash
# docker run --env PATH=/root/apache-jmeter-5.0/bin:$PATH  -v /private/var/db/timezone/tz/2018i.1.0/zoneinfo/Asia/Shanghai:/etc/localtime:ro -t -i -d -p 8089:80 -p 9022:22 --name=iat ownerworld/iat:0.0.4  /bin/start.sh "root:root@127.0.0.1:3306"
```
#### linux 环境安装
``` bash
# docker run --env PATH=/root/apache-jmeter-5.0/bin:$PATH  -v /etc/localtime:/etc/localtime:ro -t -i -d -p 8089:80 -p 9022:22 --name=iat ownerworld/iat:0.0.4 /bin/start.sh "root:root@127.0.0.1:3306"
```
#### windows 环境安装
需要把 -v 的部分去掉，但时区可能会不一致，待调试

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
