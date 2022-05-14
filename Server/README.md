# Flask 模板

> 用于Flask开发的一个简单的模板

## 目录结构

- app
  - [blueprints](./app/blueprints/)     : 蓝图
    - [api](./app/blueprints/api/)      : Api route
    - [page](./app/blueprints/page/)    : 页面 route
  - [configs](./app/configs/)           : 配置
  - [db](./app/db/)                     : 数据库 model（SQLAlchemy）
  - [extensions](./app/extensions/)     : 扩展模块
  - [fakes](./app/fakes/)               : 模拟数据
  - [scripts](./app/scripts/)           : flask 脚本
  - [templates](./app/templates/)       : 页面模板
  - [utils](./app/utils/)               : 自定义工具
- [db](./db/)                           : 数据库文件（sqlite等）
- [logs](./logs/)                       : 日志

## 项目初始化

### 安装环境

安装 `pipenv` （用来进行管理）

```powershell
pip install pipenv
```

安装 `flask` 相关库

```powershell
pipenv install
```

### 添加配置文件

在根目录下添加文件 `.env`

添加配置

```text
SECRET_KEY=<随机密匙>
<其他较隐私的配置内容>
```

## 运行程序

在项目根目录下运行以下脚本即可

```powershell
pipenv run flask run
```

### 初始化数据库

直接运行如下脚本（脚本来源目录 `./app/scripts/db_cli.py`）

```powershell
pipenv run flask dbcli init
```

## 使用

**在相关目录下编辑即可**
例：在文件 `./app/blueprints/page/index.py` 中添加 `route`(下列代码)

```python
@page_index.route('/test/')
def index_test():
  return 'this is test page'
```

运行程序后，进入页面: `http://localhost:5000/test/` 即可看到刚才添加的内容
