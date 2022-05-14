# -*- coding: utf-8 -*-
"""
    configs 模块初始化
"""

from app.configs.path import Path
from app.configs.development import DevelopmentConfig
from app.configs.production import ProductionConfig

config = {
    'development': DevelopmentConfig,
    # 'testing': Testing,
    'production': ProductionConfig
}
