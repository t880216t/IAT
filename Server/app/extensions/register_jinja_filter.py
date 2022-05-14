# -*- coding: utf-8 -*-
"""
    jinjia过滤器
"""

from flask import Flask
import app.utils.transform_ip as tip


def register_jinja_filter(app: Flask):
    """
    模板过滤器
    """
    @app.template_filter('ip_show')
    def ip_show(value):
        value = tip.get_ip_str(value)
        return value
