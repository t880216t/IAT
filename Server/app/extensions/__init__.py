# -*- coding: utf-8 -*-
"""
    extentions 模块初始化
"""

from flask import Flask
from app.extensions.alchmey import db


def register_extensions(app: Flask):
    """
    注册扩展（扩展初始化）
    """
    db.init_app(app)
