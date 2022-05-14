# -*- coding: utf-8 -*-
"""
    屏幕蓝图
"""

from flask import Flask
from app.blueprints.page.index import page_index

def init_page(app: Flask):
    """ 屏幕蓝图注册 """
    # 注册蓝本
    app.register_blueprint(page_index)