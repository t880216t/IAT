# -*- coding: utf-8 -*-
"""
    api - v1
"""

from flask import Blueprint, request
import app.blueprints.api.api_v1.index

api_v1 = Blueprint('api_v1', __name__)


@api_v1.route('/', methods=['GET'])
def index():
    return "hello api"

@api_v1.route('/test', methods=['POST'])
def test():
    user_id = request.json.get("user_id")
    return index.test(user_id)