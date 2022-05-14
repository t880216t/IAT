# -*- coding: utf-8 -*-
"""
    数据库相关操作
"""

import click
from flask.cli import AppGroup

from app.extensions import db

db_cli = AppGroup("dbcli")


@db_cli.command('init')
@click.option('--drop', is_flag=True, help='Create after drop.')
def initdb(drop):
    """初始化数据库"""
    if drop:
        click.confirm('此操作将删除数据库，您要继续吗？', abort=True)
        db.drop_all()
        click.echo('数据库被删除~')
    db.create_all()
    click.echo('数据库初始化')
