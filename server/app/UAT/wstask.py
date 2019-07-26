from flask import session, Blueprint
from flask_socketio import emit,send
from app.tables.UAT import Task
from app.tables.IAT import Task as IATTask
from app.tables.User import users
from app import db
from .. import socketio

wstask = Blueprint('wstask', __name__)

@socketio.on('connect',namespace='/wstask')
def get_connect():
  print('connect client sucess')

@socketio.on('taskInfo',namespace='/wstask')
def get_connect(message):
  taskId = message['taskId']
  row_data = Task.query.filter_by(id=taskId).first()
  taskInfo = {
    'taskId': message['taskId'],
    'status': row_data.status,
    'taskLog': row_data.task_log,
  }
  return taskInfo

@socketio.on('taskList',namespace='/wstask')
def get_connect(message):
  taskType = message['taskType']
  listData = Task.query.filter(db.and_(Task.task_type == taskType, )).order_by(db.desc(Task.add_time)).all()
  content = []
  for task in listData:
    row_data = users.query.filter(db.and_(users.id == task.user_id)).first()
    username = ""
    if row_data:
      username = row_data.username
    update_time = ""
    if task.update_time:
      update_time = task.update_time.strftime('%Y-%m-%d %H:%M:%S')
    content.append({
      "id": task.id,
      "name": task.name,
      "runTime": task.run_time,
      "add_time": task.add_time.strftime('%Y-%m-%d %H:%M:%S'),
      "add_user": username,
      "update_time": update_time,
      "status": task.status,
    })
  return content

@socketio.on('iatTaskList',namespace='/wstask')
def iatTaskList(message):
  taskType = message['taskType']
  listData = IATTask.query.filter(db.and_(IATTask.task_type == taskType, )).order_by(db.desc(IATTask.add_time)).all()
  content = []
  for task in listData:
    row_data = users.query.filter(db.and_(users.id == IATTask.user_id)).first()
    username = ""
    if row_data:
      username = row_data.username
    update_time = ""
    if task.update_time:
      update_time = task.update_time.strftime('%Y-%m-%d %H:%M:%S')
    content.append({
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
