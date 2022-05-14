# -*- coding: utf-8 -*-
"""
    主屏幕蓝图
"""

from flask import Blueprint

page_index = Blueprint('index', __name__)

@page_index.route('/', methods=['GET'])
def index():
    return 'hello Flask'