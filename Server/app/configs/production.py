# -*- coding: utf-8 -*-
"""
    生产机配置
"""

from app.configs.base import BaseConfig


class ProductionConfig(BaseConfig):
    """
    生产机配置
    """
    pass
    # SQLALCHEMY_DATABASE_URI = '{}+{}://{}:{}@{}:{}/{}?charset=utf8'.format(
    #     BaseConfig.DIALECT, BaseConfig.DRIVER, BaseConfig.USERNAME,
    #     BaseConfig.PASSWORD, BaseConfig.HOSTNAME, BaseConfig.PORTNAME,
    #     BaseConfig.DATABASE)
