#-*-coding:utf-8-*-
from flask import Blueprint,jsonify,make_response,session
from app.tables.User import users

user = Blueprint('user', __name__)

@user.before_request
def before_user():
  if 'username' in session:
    pass
  else:
    return make_response(jsonify({'code': 99999, 'msg': 'session error'}))

@user.route('/currentUser')
def list():
  username = session.get('username')
  data = users.query.filter_by(username=username).first()
  if data == None:
    return make_response(jsonify({'code': 10002, 'msg': u'用户信息异常'}))
  user_data = {
    "name": data.username,
    "avatar": 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    "userid": data.id,
    "email": data.email,
    "signature": '海纳百川，有容乃大',
    "title": '交互专家',
    "group": '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    "tags": [
      {
        "key": '0',
        "label": '很有想法的',
      },
    ],
    "notifyCount": 12,
    "country": 'China',
    "geographic": {
      "province": {
        "label": '浙江省',
        "key": '330000',
      },
      "city": {
        "label": '杭州市',
        "key": '330100',
      },
    },
    "address": '西湖区工专路 77 号',
    "phone": data.phoneNumber,
  }
  return make_response(jsonify({'code': 0, 'msg': '', 'user_data':user_data}))
