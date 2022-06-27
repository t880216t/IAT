# -*- coding: utf-8 -*-
"""
    api
"""
import os, subprocess, json, io, uuid
from flask import current_app, make_response, jsonify
from app.db.models.Tables import *


def test(user_id):
    return make_response(jsonify({'code': 0, 'content': {'user_name': f'你是{user_id}'}, 'msg': '操作成功'}))

def test1(user_id):
    return make_response(jsonify({'code': 0, 'content': {'user_name': f'字段超出限制'}, 'msg': '操作成功'}))

def test2(user_name):
    return make_response(jsonify({'code': 0, 'content': {'user_name': f'{user_name}'}, 'msg': '操作成功'}))