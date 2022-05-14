# -*- coding: utf-8 -*-
"""
    api
"""
import os, subprocess, json, io, uuid
from flask import current_app, make_response, jsonify
from app.db.models.Tables import *


def test(user_id):
    print(user_id)
    return make_response(jsonify({'code': 0, 'content': {}, 'msg': '操作成功'}))