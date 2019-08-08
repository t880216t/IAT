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
项目提供了个简单的shell脚本去安装相关依赖，但前提是你已经有了npm、python，本工具建议部署在有可视化界面的MAC/Linux机器上。windows可以用gitbash执行该脚本。
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


### 启动后端服务


### 配置Nginx反向代理
