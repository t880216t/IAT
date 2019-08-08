# -*-coding:utf-8-*-
from flask import Blueprint, jsonify, make_response, session, request
from app.tables.UAT import Project, CaseInfo, TimTaskLog, Task, HomeDayExcuteCount, FailCaseLog, Tree
from datetime import datetime, date, timedelta
from app.tables.User import users
import os, hashlib, json, base64, time, binascii,subprocess
from app import db, app
from sqlalchemy import extract

task = Blueprint('task', __name__)

@task.route('/taskList', methods=['POST'])
def taskList():

  user_id = session.get('user_id')
  taskType = request.json.get("taskType")
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

  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))

@task.route('/addTask', methods=['POST'])
def addDebugTask():

  user_id = session.get('user_id')
  browserType = request.json.get("browserType")
  name = request.json.get("name")
  project = request.json.get("project")
  proxyType = request.json.get("proxyType")
  runTime = request.json.get("runTime")
  taskCase = request.json.get("taskCase")
  taskType = request.json.get("taskType")
  valueType = request.json.get("valueType")
  versionId = request.json.get("version")
  host = request.json.get("host")
  try:
    data = Task(name, taskType, 0, json.dumps(taskCase), runTime, user_id, project, valueType, browserType, proxyType, versionId, host)
    db.session.add(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': {'taskid': data.id}, 'msg': u'新建成功'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'新建失败!'}))

@task.route('/taskDelete', methods=['POST'])
def taskDelete():
  id = request.json.get("id")
  rowData = Task.query.filter(db.and_(Task.id == id)).first()
  if rowData:
    if rowData.status not in (0, 4) and rowData.task_type == 3:
      return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'任务已被执行，请先关闭!'}))
    db.session.delete(rowData)
    db.session.commit()
  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功'}))

@task.route('/updateTaskStatus', methods=['POST'])
def updateTaskStatus():
  id = request.json.get("id")
  status = request.json.get("status")
  rowData = Task.query.filter(db.and_(Task.id == id))
  if rowData.first():
    data = {
      'status': status,
    }
    rowData.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))
  else:
    return make_response(jsonify({'code': 10002, 'msg': u'执行失败!', 'content': None}))

@task.route('/taskExcute', methods=['POST'])
def taskExcute():

  user_id = session.get('user_id')
  id = request.json.get("id")
  data = {'status': 1}
  taskData = Task.query.filter_by(id=id)
  if taskData.first():
    taskData.update(data)
    db.session.commit()
    taskType = taskData.first().task_type
    if taskType == 3:
      subprocess.Popen("python runUITiming.py runScript -i %s " % id, shell=True)
    else:
      subprocess.Popen("python runUITest.py runScript -i %s" % id, shell=True)
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'开始执行!'}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': u'执行失败!', 'content': None}))

@task.route('/taskReport', methods=['GET'])
def taskReport():
  id = request.values.get("id")
  rowData = Task.query.filter(db.and_(Task.id == id)).first()
  content = {}
  if rowData and rowData.task_log:
    content = json.loads(rowData.task_log)
    content['project'] = rowData.project_id
  return make_response(jsonify({'code': 0, 'content': content, 'msg': u'删除成功'}))

@task.route('/taskReportByDate', methods=['POST'])
def taskReportByDate():
  id = request.json.get("id")
  executeDate = request.json.get("executeDate")
  rowData = TimTaskLog.query.filter(db.and_(TimTaskLog.task_id == id,TimTaskLog.excute_date== executeDate)).first()
  content = {}
  if rowData:
    projectId = Task.query.filter_by(id=rowData.task_id).first().project_id
    content = json.loads(rowData.task_log)
    content['project'] = projectId
  return make_response(jsonify({'code': 0, 'content': content, 'msg': u'删除成功'}))

@task.route('/taskInfo', methods=['GET'])
def taskInfo():
  id = request.values.get("id")
  rowData = Task.query.filter(db.and_(Task.id == id)).first()
  content = {}
  if rowData:
    content = {
      'id': id,
      'taskType': rowData.task_type,
      'runTime': rowData.run_time,
      'project': rowData.project_id,
      'name': rowData.name,
      'valueType': rowData.value_type,
      'browserType': rowData.browser_type,
      'proxyType': rowData.proxy_type,
      'host': rowData.host,
      'taskCase': json.loads(rowData.case_id),
    }
  return make_response(jsonify({'code': 0, 'content': content, 'msg': u'操作成功'}))

@task.route('/updateTask', methods=['POST'])
def updateTask():
  user_id = session.get('user_id')
  id = request.json.get("id")
  browserType = request.json.get("browserType")
  name = request.json.get("name")
  project = request.json.get("project")
  proxyType = request.json.get("proxyType")
  runTime = request.json.get("runTime")
  taskCase = request.json.get("taskCase")
  taskType = request.json.get("taskType")
  valueType = request.json.get("valueType")
  rowData = Task.query.filter(db.and_(Task.id == id))
  if rowData.first():
    if rowData.first().status not in [0, 4]:
      return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'当前任务已被执行，无法修改!'}))
    data = {
      'name': name,
      'task_type': taskType,
      'case_id': json.dumps(taskCase),
      'run_time': runTime,
      'user_id': user_id,
      'project_id': project,
      'value_type': valueType,
      'browser_type': browserType,
      'proxy_type': proxyType,
    }
    rowData.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None , 'msg': u'操作成功!'}))
  else:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败!'}))

@task.route('/getHomeData', methods=['GET'])
def getHomeData():
  caseCount = CaseInfo.query.filter(db.and_(CaseInfo.type == 1)).count()
  projectCount = Project.query.filter(db.and_(Project.status == 1)).count()
  immTaskCount = Task.query.filter(db.and_(Task.task_type == 2)).count()
  timTaskCount = Task.query.filter(db.and_(Task.task_type == 3)).count()
  today = date.today()
  nearOneMonthData = []
  monthFailCount = 0
  monthTotalCount = 0
  # 往前30天每天的数据
  for d in range(0,30):
    dayDate = today - timedelta(days=d)
    dailyResult = HomeDayExcuteCount.query.filter(db.cast(HomeDayExcuteCount.add_time, db.DATE) == dayDate).all()
    dayFailCount = 0
    dayTotalCount = 0
    if len(dailyResult) > 0:
      for dayResult in dailyResult:
        dayFailCount += dayResult.fail_count
        dayTotalCount += dayResult.total_count
    monthFailCount += dayFailCount
    monthTotalCount += dayTotalCount
    dayDateStr = dayDate.strftime("%Y-%m-%d %H:%M:%S")
    stamptime = time.mktime(time.strptime(dayDateStr, "%Y-%m-%d %H:%M:%S"))
    nearOneMonthData.append({
      'runTime': round(stamptime * 1000),
      'day': dayDate.strftime("%Y-%m-%d"),
      'runTaskCount': len(dailyResult),
      'failCount': dayFailCount,
      'totalCount': dayTotalCount,
    })
  caseMountAddData = []
  thisMonth = 0
  year = datetime.now().year
  month = datetime.now().month
  for m in range(1,13):
    monthCaseCount = CaseInfo.query.filter(db.and_(
      extract('year', CaseInfo.update_time) == year,
      extract('month', CaseInfo.update_time) == m,
      CaseInfo.type == 1,
    )).count()
    if m == month:
      thisMonth = monthCaseCount
    caseMountAddData.append({
      'x': '{year}-{month}'.format(year=year,month=m),
      'y': monthCaseCount,
    })
  monthSucessCount = monthTotalCount - monthFailCount
  monthExecutePre = 0
  if monthTotalCount > 0:
    monthExecutePre = round((monthSucessCount / monthTotalCount)* 10, 1)
  content = {
    'caseCount': caseCount,
    'projectCount': projectCount,
    'immTaskCount': immTaskCount,
    'timTaskCount': timTaskCount,
    'nearOneMonthData': nearOneMonthData,
    'caseMountAddData': caseMountAddData,
    'thisMonth': thisMonth,
    'monthExecutePre': monthExecutePre,
  }

  return make_response(jsonify({'code': 0, 'content': content, 'msg': u'操作成功!'}))

@task.route('/getHomeFailCase', methods=['GET'])
def getHomeFailCase():
  results = FailCaseLog.query.filter().limit(30).all()
  content = []
  if len(results) > 0:
    for result in results:
      caseData = CaseInfo.query.filter_by(pid = result.case_id).first()
      project = Tree.query.filter_by(id = result.case_id).first()
      if caseData and project:
        content.append({
          'id': result.case_id,
          'name': caseData.name,
          'project': project.project_id,
          'add_time': result.add_time.strftime('%Y-%m-%d %H:%M:%S'),
        })
  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))
