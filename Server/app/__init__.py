# -*- coding: utf-8 -*-
"""
@Description:
    1. 创建程序实例
    2. 初始化扩展
"""

import os
import click

from flask import Flask

from app.configs import config
from app.extensions import register_extensions
from app.extensions.register_errors import register_errors
from app.extensions.register_jinja_filter import register_jinja_filter
from app.blueprints import register_blueprints
from app.scripts import register_commands


def create_app(config_name=None):
    """
    工厂函数：创建程序实例
    config_name: 传入配置名，没有配置默认开发
    """
    if config_name is None:
        config_name = os.getenv('FLASK_CONFIG', 'development')

    app = Flask(__name__, template_folder='templates')
    app.config.from_object(config[config_name])

    register_extensions(app)
    register_blueprints(app)
    register_commands(app)
    register_errors(app)
    register_jinja_filter(app)

    # 去掉Jinja2语句占据的空行
    app.jinja_env.trim_blocks = True
    app.jinja_env.lstrip_blocks = True
    return app
