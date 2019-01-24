#-*-coding:utf-8-*-
from flask import Flask
import os
from datetime import timedelta

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'
app.config['DOMAIN'] = 'https://xxxxxxxx/xxx/'
app.config['ALLOWED_EXTENSIONS'] = set(['png', 'jpg', 'jpeg', 'gif','HTML','html','xlsx'])
app.config['SECRET_KEY']= "thisisaverycooltestpalt"   #设置为24位的字符,每次运行服务器都是不同的，所以服务器启动一次上次的session就清除。
app.config['PERMANENT_SESSION_LIFETIME']=timedelta(days=7) #设置session的保存时间。

'''
入口路由配置
'''
@app.route('/')
def hello_world():
    return 'Hello World!'

'''
数据库对象创建
'''
from flask_sqlalchemy import SQLAlchemy

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:root@127.0.0.1:3306/IAT?charset=utf8mb4"
app.config["SQLALCHEMY_POOL_RECYCLE"] = 15
# 动态追踪数据库的修改. 性能不好. 且未来版本中会移除. 目前只是为了解决控制台的提示才写的
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
db = SQLAlchemy(app)

'''
注册蓝图
'''
from .build.login import auth
app.register_blueprint(auth, url_prefix='/api/auth')

from .build.user import user
app.register_blueprint(user, url_prefix='/api')

from .IAT.api import api
app.register_blueprint(api, url_prefix='/api/IAT')
