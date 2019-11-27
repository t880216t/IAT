from flask import session, Blueprint
from flask_socketio import emit,send
from app.tables.IAT import Task as IATTask
from app.tables.User import users
from app import db
from .. import socketio

wstask = Blueprint('wstask', __name__)

@socketio.on('connect',namespace='/wstask')
def get_connect():
  print('connect client sucess')

@socketio.on('disconnect',namespace='/wstask')
def get_disconnect():
  print('disconnect client sucess')

@socketio.on('iatTaskInfo',namespace='/wstask')
def iatTaskInfo(message):
  taskId = message['taskId']
  row_data = IATTask.query.filter_by(id=taskId).first()
  taskInfo = {
    'taskId': message['taskId'],
    'status': row_data.status,
    'taskLog': row_data.result,
  }
  return taskInfo

@socketio.on('iatTaskList',namespace='/wstask')
def iatTaskList(message):
  taskType = message['taskType']
  try:
    pageNum = message['pageNum']
  except:
    pageNum = None
  dataCount = IATTask.query.filter(db.and_(IATTask.task_type == taskType, )).count()
  if pageNum:
    listData = IATTask.query.filter(db.and_(IATTask.task_type == taskType, )).order_by(db.desc(IATTask.add_time)).slice(
      (pageNum - 1) * 20, pageNum * 20).all()
  else:
    listData = IATTask.query.filter(db.and_(IATTask.task_type == taskType, )).order_by(db.desc(IATTask.add_time)).all()
  content = {
    'taskContent': [],
    'total': dataCount,
  }
  for task in listData:
    row_data = users.query.filter(db.and_(users.id == task.user_id)).first()
    username = ""
    if row_data:
      username = row_data.username
    update_time = ""
    if task.update_time:
      update_time = task.update_time.strftime('%Y-%m-%d %H:%M:%S')
    content['taskContent'].append({
      "id": task.id,
      "name": task.name,
      "runTime": task.run_time,
      "add_time": task.add_time.strftime('%Y-%m-%d %H:%M:%S'),
      "add_user": username,
      "update_time": update_time,
      "status": task.status,
      "taskDesc": task.task_desc,
    })
  return content
