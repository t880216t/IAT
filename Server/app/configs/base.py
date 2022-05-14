# -*- coding: utf-8 -*-
"""
    基础配置
"""

import os
from app.configs.path import Path


class BaseConfig(object):
    """
    基础配置
    """
    # 加密密匙
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev key')

    # 数据库设置
    # 是否追踪对象的修改
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 'sqlite:///' + os.path.join(Path.sqlite, 'data.db'))

    # 邮件收发
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = ('GP_EHR', MAIL_USERNAME)
