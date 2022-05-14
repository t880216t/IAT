# -*- coding: utf-8 -*-
"""
    项目路径配置
"""

import os


class Path(object):
    base = os.path.abspath(os.path.dirname(
        os.path.dirname(os.path.dirname(__file__))))
    app = os.path.join(base, 'app')
    log = os.path.join(base, 'logs')
    env = os.path.join(base, '.env')
    sqlite = os.path.join(base, 'db')
