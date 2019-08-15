# 快速开始
## **环境要求**

> 平台设计之初我在Windows上开发的，后期考虑到docker的使用，转而到MAC上部署调试，所以本安装教程是基于MAC环境的。
> 关于Windows上的部署，建议根据自己的情况手动分步安装。
---

| 应用名 | 版本 |
| :-- | :--  |
| npm | >=5.6.0 |
| python | >=3.6.0 |
| docker | 18 |
| jmeter | >=5.0 |
| nginx | 1.15.8 |
| mysql | >=5.6 |
| git | 2.17.2 |


---

## **获取项目代码**

``` bash
$ git clone -b VictorinoxForTest https://github.com/t880216t/IAT my-project
```

## **安装**

这里我假设你上面环境要求里的软件都已经正确安装，并配置完成环境变量。

### 方法一：一键安装
库表导入且配置可用，参考[库表导入](http://127.0.0.1:8000/install/#_9)

项目提供了个简单的shell脚本去安装相关依赖，但前提是你已经有了npm、python、mysql，本工具建议部署在有可视化界面的MAC/Linux机器上。windows可以用gitbash执行该脚本。
``` bash
$ cd my-project
$ chmod +x install.sh
$ ./install.sh
> 选择1.init project
```

### 方法二：手动安装

- 1 安装前端依赖:
``` bash
$ cd my-project
$ npm install
```

??? note "国内安装较慢，建议用cnpm安装"
    ```bash
    $ npm -g cnpm
    $ cnpm i
    ```

- 2 安装python虚拟环境:
``` bash
$ pyvenv server/venv
$ source server/venv/bin/activate
$ pip install -r server/requirements.txt
$ deactivate
```

??? note "国内建议用清华的源"
    ```bash
    $ pip install xxxxx -i https://pypi.tuna.tsinghua.edu.cn/simple
    ```
 
- 3 构建docker镜像
``` bash
$ cd server/vft_docker
$ docker build -t vft_docker:latest .
```

- 4 添加webdriver
这里我提供了下载好的Mac版本的driver，放到对应的python环境Scripts目录下。
比如前面我们是用虚拟环境：
```bash
$ cp -r server/webDrivers/mac/* server/venv/xxx/Scripts
```

## **部署**
由于本项目是前后端分离的架构，你需要用nginx等web容器来完成反向代理部署。
### 打包前端
``` bash
$ npm run build
```
打包后生成的dist文件夹，即是前端应用，需要部署到web容器中渲染。

### 库表导入
创建一个库，默认
```text
数据库名：vft 
字符集：utf8mb4 -- UTF-8 Unicode
排序规则：utf8mb4_general_ci
```
所需的库表结构在 server/db/vft.sql 中，可以通过其它数据库工具或者mysqldump命令行导入。
```text
$ mysqldump -u root -p vft < vft.sql
```
数据库连接配置在 server/app/\__init\__.py 的
```text
app.config["SQLALCHEMY_DATABASE_URI"] = "xxxxxxxxxxx"
```

### 启动后端服务
``` bash
$ cd server
$ python run.py
```
默认是5001端口，可以在server/run.py中自已改下。
    
### 配置Nginx反向代理

```bash
server {
  listen       80; # 端口根据自已的需要自定义
  server_name  www.xxxxx.test;

  location / {
		root   VFT; # 这里是指前端打包后的应用文件
		index  index.html index.htm;
		try_files $uri $uri/ /index.html =404;
        }
		
	location /api/ { 
		proxy_pass http://127.0.0.1:5001;  
		proxy_set_header Host $host:$server_port;
	}
		
	location img/ { 
		proxy_pass http://127.0.0.1:5001/;  
		proxy_set_header Host $host:$server_port;
	}
}
```
如果前后端配置正确，此时你可以访问 http://127.0.0.1 访问应用了。
