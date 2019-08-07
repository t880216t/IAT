# 快速开始
## 环境要求

> 平台设计之初我在Windows上开发的，后期考虑到docker的使用，转而到MAC上部署调试，所以本安装教程是基于MAC环境的。
> 关于Windows上的部署，建议根据自己的情况手动分步安装。
---

| 包名 | 版本 |
| :-- | :--  |
| npm | >=5.6.0 |
| python | >=3.6.0 |
| docker | 3.0.1 |
| jmeter | >=5.0 |

## **VFT 部署**

---

## 获取项目代码

``` bash
$ git clone -b VictorinoxForTest https://github.com/t880216t/IAT my-project
```

## 安装

### 方法一：一键安装
项目提供了个简单的shell脚本去安装相关依赖，但前提是你已经有了npm、python，本工具建议部署在有可视化界面的MAC/Linux机器上。
``` bash
$ cd my-project
$ chmod +x install.sh
$ ./install.sh
## 选择1.init project
```

### 方法二：手动安装
