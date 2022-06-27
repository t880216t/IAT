# -*- coding: utf-8 -*-
"""
    api - v1
"""

from flask import Blueprint, request
import app.blueprints.api.api_v1.index

api_v1 = Blueprint('api_v1', __name__)


@api_v1.route('/', methods=['GET'])
def default():
    return "hello api"

@api_v1.route('/test', methods=['GET'])
def test():
    user_id = request.values.get("user_id")
    if len(user_id) <= 8:
        # user_id = "1"
        return index.test(user_id)
    else:
        return index.test1(user_id)

@api_v1.route('/test_login', methods=['POST'])
def test21():
    user_name = request.values.get("user_name")
    password = request.values.get("password")
    return index.test2(user_name)