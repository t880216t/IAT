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
    "avatar": 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    "userid": data.id,
    "email": data.email,
    "phone": data.phoneNumber,
  }
  return make_response(jsonify({'code': 0, 'msg': '', 'content':user_data}))
