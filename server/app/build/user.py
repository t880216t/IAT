#-*-coding:utf-8-*-
from flask import Blueprint,jsonify,make_response,session
from app.tables.User import users

user = Blueprint('user', __name__)

@user.before_request
def before_user():
  if 'username' in session:
    pass
  else:
    return make_response(jsonify({'code': 99999, 'msg': '未登录'}))

@user.route('/currentUser')
def list():
  username = session.get('username')
  data = users.query.filter_by(username=username).first()
  if data == None:
    return make_response(jsonify({'code': 10002, 'msg': u'用户信息异常'}))
  user_data = {
    "name": data.username,
    "avatar": 'https://testerhome.com/system/letter_avatars/2/T/163_163_163/96.png',
    "userid": data.id,
    "email": data.email,
    "signature": '海纳百川，有容乃大',
    "title": '测试专家',
    "group": '某某某事业群－某某平台部－某某技术部－测试部',
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
        "label": '江苏省',
        "key": '210000',
      },
      "city": {
        "label": '南京市',
        "key": '210000',
      },
    },
    "address": '浦口区',
    "phone": data.phoneNumber,
  }
  return make_response(jsonify({'code': 0, 'msg': '', 'user_data':user_data}))
