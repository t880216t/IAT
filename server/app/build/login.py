#-*-coding:utf-8-*-
from flask import Blueprint,jsonify,make_response,session,request
from app.tables.User import users
from app.tables.UAT import HomeBack
import os, hashlib, re, binascii
from random import randint
from app import db

auth = Blueprint('auth', __name__)

def encrypt_password(name, salt=None, encryptlop=30):
  if not salt:
    salt = binascii.hexlify(os.urandom(32)).decode()  # length 32
  for i in range(encryptlop):
    name = hashlib.sha1(str(name + salt).encode('utf-8')).hexdigest()  # length 64
  return name, salt

@auth.route('/login',methods=['POST'])
def login():
  username = request.json.get("username")
  password = request.json.get("password")
  type = request.json.get("type")
  data = users.query.filter_by(username=username).first()
  if data == None:
    return make_response(jsonify({'code': 10002, 'msg': u'错误的用户名或者密码!',"type":type}))
  if encrypt_password(password, data.salt)[0] == data.hash_password:
    session['username'] = data.username
    session['user_id'] = data.id
    return make_response(jsonify({'code': 0, 'msg': u'登录成功', 'userID': data.id, 'userName': data.username,"currentAuthority":data.account_type,"type":type}))
  else:
    return make_response(jsonify({'code': 10002, 'msg': u'错误的用户名或者密码!',"type":type}))

@auth.route('/register',methods=['POST'])
def register():
  username = request.json.get("username")
  password = request.json.get("password")
  email = request.json.get("email")
  zhmodel = re.compile(u'[\u4e00-\u9fa5]')  # 检查中文
  match = zhmodel.search(username)
  if match:
    return make_response(jsonify({'code': 10002, 'msg': u'用户名不能包含中文!'}))
  data = users.query.filter_by(username=username).first()
  if data:
    return make_response(jsonify({'code': 10002, 'msg': u'用户名已存在!'}))
  hash_password, salt = encrypt_password(password)
  data = users(username,hash_password,salt,email,0,1)
  db.session.add(data)
  db.session.commit()
  return make_response(jsonify({'code': 0, 'msg': u'注册成功'}))

@auth.route('/logout')
def logout():
    session.clear()
    return make_response(jsonify({'code': 0, 'msg': u'退出登录'}))

@auth.route('/getHomeBack')
def getHomeBack():
  imgUrl = ''
  imgDatas = HomeBack.query.filter().order_by(db.desc(HomeBack.add_time)).all()
  if len(imgDatas) > 0:
    imgIndex = randint(0, len(imgDatas))
    imgUrl = imgDatas[imgIndex].url
  return make_response(jsonify({'code': 0,'content':{'imgUrl':imgUrl}, 'msg': ''}))
