# -*- coding: utf-8 -*-
"""
    蓝图
"""

from flask import Flask
from app.blueprints.api.api_v1 import api_v1
from app.blueprints.page import init_page


def register_blueprints(app: Flask):
    """
    注册蓝本
    """
    # 注册蓝本
    app.register_blueprint(api_v1, url_prefix='/api/')
    init_page(app)
