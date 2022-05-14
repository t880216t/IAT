# -*- coding: utf-8 -*-
"""
    命令行脚本
"""

from flask import Flask
from app.scripts.db_cli import db_cli

def register_commands(app: Flask):
    # 数据库相关操作
    app.cli.add_command(db_cli)