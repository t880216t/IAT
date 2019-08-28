# -*-coding:utf-8-*-
from flask import Blueprint, jsonify, make_response, session, request
from app.tables.UAT import Tree,CaseInfo,CaseStep,CaseLibs,CaseKeywords,CaseProjectSetting,Task,StepIndexDesc, GlobalValues, ProjectFile
import os, hashlib, json, base64, binascii,subprocess
from app import db, app
from app.tables.User import users
from datetime import datetime

case = Blueprint('case', __name__)

def encrypt_name(name, salt=None, encryptlop=30):
  if not salt:
    salt = binascii.hexlify(os.urandom(32)).decode()  # length 32
  for i in range(encryptlop):
    name = hashlib.sha1(str(name + salt).encode('utf-8')).hexdigest()  # length 64
  return name

@case.before_request
def is_login():  # 判断是否登录
  url = request.path
  white_list = [
    u'/api/UAT/case/uploadLib',
    u'/api/UAT/case/uploadKeyword',
  ]
  if url not in white_list:
    if not session.get("user_id"):
      # 重定向到登录页面
      return make_response(jsonify({'code': 99999, 'content': None, 'msg': u'请先登录!'}))
  else:
    pass

def saveBase64ToImage(base64Byte):
  fileHash = encrypt_name('testestest')
  fileName = fileHash + '.png'
  fileDir = app.root_path + '/' + app.config['UPLOAD_FOLDER']
  if not os.path.isdir(fileDir):
    os.makedirs(fileDir)
  with open(fileDir+'/'+fileName, 'wb') as f:
    f.write(base64.b64decode(base64Byte.replace('data:image/png;base64,', '')))
  return app.config['UPLOAD_FOLDER']+fileName

def syncTreeName(id,name):
  rowData = Tree.query.filter_by(id=id)
  if rowData:
    data = {
      'name': name,
    }
    rowData.update(data)
    db.session.commit()

@case.route('/getKeywordInfo', methods=['GET'])
def getKeywordInfo():
  id = request.values.get("caseId")
  rowData = CaseInfo.query.filter_by(pid=id).first()
  content = {}
  if rowData:
    returns = []
    if rowData.return_values:
      returns = json.loads(rowData.return_values)
    content = {
      'id': rowData.id,
      'name': rowData.name,
      'params': json.loads(rowData.params),
      'returns': returns,
      'doc': rowData.doc,
    }
  return make_response(
    jsonify({'code': 0, 'content': content, 'msg': ''}))

@case.route('/updateKeywordInfo', methods=['POST'])
def updateKeywordInfo():
  id = request.json.get("caseId")
  keywordInfo = request.json.get("keywordInfo")
  rowData = CaseInfo.query.filter_by(pid=id)
  if rowData.first():
    data = {
      'name': keywordInfo['name'],
      'params': json.dumps(keywordInfo['params']),
      'return_values': json.dumps(keywordInfo['returns']),
      'doc': keywordInfo['doc']
    }
    rowData.update(data)
    db.session.commit()
    syncTreeName(id,keywordInfo['name'])
    return make_response(jsonify({'code': 0, 'content': None, 'msg': ''}))
  else:
    return make_response(jsonify({'code': 10002, 'msg': 'no such word', 'content': []}))

def updateCaseUser(caseId,userId):
  rowData = CaseInfo.query.filter_by(pid=caseId)
  if rowData.first():
    data = {
      'user_id': userId,
      'update_time': datetime.now(),
    }
    rowData.update(data)
    db.session.commit()

@case.route('/updateCaseInfo', methods=['POST'])
def updateCaseInfo():
  user_id = session.get('user_id')
  id = request.json.get("id")
  caseInfo = request.json.get("caseInfo")
  rowData = CaseInfo.query.filter_by(pid=id)
  if rowData.first():
    data = {
      'name': caseInfo['name'],
      'doc': caseInfo['doc'],
      'set_up': json.dumps(caseInfo['setUp']),
      'tear_down': json.dumps(caseInfo['tearDown']),
    }
    rowData.update(data)
    db.session.commit()
    updateCaseUser(id, user_id)
    syncTreeName(id,caseInfo['name'])
    return make_response(jsonify({'code': 0, 'content': None, 'msg': ''}))
  else:
    return make_response(jsonify({'code': 10002, 'msg': 'no such case', 'content': []}))

@case.route('/caseData', methods=['GET'])
def caseData():
  id = request.values.get("caseId")
  versionId = request.values.get("versionId")
  caseData = CaseInfo.query.filter_by(pid=id).first()
  if versionId:
    caseStepDatas = CaseStep.query.filter(
      db.and_(
        CaseStep.case_id == id,
        CaseStep.delete_flag == 0,
        db.or_(CaseStep.version_id == versionId, CaseStep.version_id == None),
      )
    ).order_by(db.asc(CaseStep.indexId)).all()
  else:
    caseStepDatas = CaseStep.query.filter(db.and_(CaseStep.case_id ==id,CaseStep.version_id == None)).order_by(db.asc(CaseStep.indexId)).all()
  caseSteps = []
  for index,item in enumerate(caseStepDatas):
    # imageUrl = ('img/'+item.element_cap) if item.element_cap else ''
    # eventType = 'empty'
    # eventDoc = {}
    # eventNameDrict = json.loads(item.event_name)
    # if eventNameDrict:
    #   keywordData = CaseKeywords.query.filter_by(id=eventNameDrict['key']).first()
    #   eventType = keywordData.word_type
    #   eventDoc = {
    #     'id': keywordData.id,
    #     'word_type': keywordData.word_type,
    #     'name_en': keywordData.name_en,
    #     'name_zh': keywordData.name_zh,
    #     'shortdoc': keywordData.shortdoc,
    #     'doc': keywordData.doc,
    #     'args': keywordData.args,
    #     'add_time': keywordData.add_time.strftime('%Y-%m-%d %H:%M:%S'),
    #   }
    caseSteps.append({
      'id': item.id,
      'indexId': index+1,
      'versionId': item.version_id,
      'values': json.loads(item.values),
      'add_time': item.add_time.strftime('%Y-%m-%d %H:%M:%S'),
    })
  deleteStepIds = CaseStep.query.filter(db.and_(CaseStep.delete_flag == 1, CaseStep.version_id == versionId)).all()
  if deleteStepIds:
    for deleteStep in deleteStepIds:
      for caseStep in caseSteps:
        if deleteStep.pid == caseStep['id']:
          caseSteps.remove(caseStep)
  releaseIsoStepIds = CaseStep.query.filter(db.and_(CaseStep.delete_flag == 0, CaseStep.version_id == versionId)).all()
  if releaseIsoStepIds:
    for releaseIsoStep in releaseIsoStepIds:
      for caseStep in caseSteps:
        if releaseIsoStep.pid == caseStep['id']:
          caseSteps.remove(caseStep)
  user_data = users.query.filter(db.and_(users.id == caseData.user_id)).first()
  userName = ""
  if user_data:
    userName = user_data.username
  setUpData = caseData.set_up if caseData.set_up else '[]'
  tearDownData = caseData.tear_down if caseData.tear_down else '[]'
  content = {
    'name': caseData.name,
    'doc': caseData.doc,
    'setUp': json.loads(setUpData),
    'tearDown': json.loads(tearDownData),
    'caseId': caseData.pid,
    'caseStep': caseSteps,
    'userName': userName,
    'add_time': caseData.add_time.strftime('%Y-%m-%d %H:%M:%S'),
    'update_time': caseData.add_time.strftime('%Y-%m-%d %H:%M:%S'),
  }
  return make_response(
    jsonify({'code': 0, 'content': content, 'msg': ''}))

@case.route('/treeList', methods=['GET'])
def treeList():
  id = request.values.get("id")
  listData = Tree.query.filter(db.and_(Tree.project_id == id)).order_by(db.asc(Tree.name)).all()
  def getChild(pid):
    result = []
    for obj in listData:
      if obj.pid == pid:
        result.append({
          "id": obj.id,
          "name": obj.name,
          "indexId": obj.index_id,
          "noteType": obj.type,
          "children": getChild(obj.id),
        })
    return result
  content = getChild(0)
  return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': content}))

@case.route('/caseTreeList', methods=['GET'])
def caseTreeList():
  id = request.values.get("id")
  listData = Tree.query.filter(db.and_(Tree.project_id == id, Tree.type.notin_([3,4]))).order_by(db.asc(Tree.name)).all()
  def getChild(pid):
    result = []
    for obj in listData:
      if obj.pid == pid:
        result.append({
          "id": obj.id,
          "name": obj.name,
          "indexId": obj.index_id,
          "noteType": obj.type,
          "children": getChild(obj.id),
        })
    return result
  content = getChild(0)
  return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': content}))

@case.route('/addCase', methods=['POST'])
def addCase():

  user_id = session.get('user_id')
  id = request.json.get("id")
  name = request.json.get("name")
  try:
    project_id = Tree.query.filter_by(id=id).first().project_id
    index_id = Tree.query.filter(db.and_(Tree.project_id == project_id, )).order_by(
      db.desc(Tree.index_id)).first().index_id
    data = Tree(project_id, id, name, 2, user_id, index_id + 1)
    db.session.add(data)
    db.session.commit()
    caseData = CaseInfo.query.filter_by(pid=data.id).first()
    if not caseData:
      addData = CaseInfo(data.id,name,user_id,1,'','')
      db.session.add(addData)
      db.session.commit()
    return make_response(jsonify({'code': 0, 'content': {"id":data.id}, 'msg': u'新建成功!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'新建失败!'}))

@case.route('/addSubFolder', methods=['POST'])
def addSubFolder():

  user_id = session.get('user_id')
  id = request.json.get("id")
  name = request.json.get("name")
  try:
    project_id = Tree.query.filter_by(id=id).first().project_id
    index_id = Tree.query.filter(db.and_(Tree.project_id == project_id, )).order_by(
      db.desc(Tree.index_id)).first().index_id
    data = Tree(project_id, id, name, 1, user_id, index_id + 1)
    db.session.add(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'新建成功!'}))
  except Exception as e:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'新建失败!'}))

@case.route('/addCustomKeyword', methods=['POST'])
def addCustomKeyword():

  user_id = session.get('user_id')
  id = request.json.get("id")
  name = request.json.get("name")
  try:
    project_id = Tree.query.filter_by(id=id).first().project_id
    index_id = 0
    indexData = Tree.query.filter(db.and_(Tree.project_id == project_id,Tree.type == 4)).order_by(
      db.desc(Tree.index_id)).first()
    if indexData:
      index_id = indexData.index_id
    data = Tree(project_id, id, name, 4, user_id, index_id + 1)
    db.session.add(data)
    db.session.commit()
    caseData = CaseInfo.query.filter_by(pid=data.id).first()
    if not caseData:
      addData = CaseInfo(data.id, name, user_id, 2, json.dumps([]), json.dumps([]))
      db.session.add(addData)
      db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'新建成功!'}))
  except Exception as e:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'新建失败!'}))

@case.route('/addCaseStep', methods=['POST'])
def addCaseStep():

  user_id = session.get('user_id')
  caseId = request.json.get("caseId")
  versionId = request.json.get("versionId")
  caseStepData = request.json.get("caseStep")
  try:
    hadStep = CaseStep.query.filter(db.and_(CaseStep.case_id == caseId, )).order_by(
      db.desc(CaseStep.indexId)).first()
    newIndex = 1
    if hadStep:
      newIndex += hadStep.indexId
    # versionIdInt = 0
    # if versionId:
    #   versionIdInt = versionId
    data = CaseStep(caseId,newIndex,json.dumps(caseStepData),user_id,versionId,0)
    db.session.add(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': {'id': data.id}, 'msg': u'新建成功!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'新建失败!'}))

def makeReleaseCaseIso(changeStepId, versionId, user_id, values):
  rowData = CaseStep.query.filter_by(id=changeStepId)
  if rowData.first():
    caseVersionId = rowData.first().version_id
    if not versionId or caseVersionId == versionId:
      data = {
        'values': values,
      }
      rowData.update(data)
      db.session.commit()
    else:
      # data = {
      #   'delete_flag': 1
      # }
      # rowData.update(data)
      # db.session.commit()
      addData = CaseStep(
        rowData.first().case_id,
        rowData.first().indexId,
        values,
        user_id,
        versionId,
        0,
        changeStepId,
      )
      db.session.add(addData)
      db.session.commit()

@case.route('/updateCaseStep', methods=['POST'])
def updateCaseStep():
  user_id = session.get('user_id')
  changeSteps = request.json.get("changeSteps")
  versionId = request.json.get("versionId")
  changeStepId = request.json.get("changeStepId")
  if changeSteps:
    for changeStep in changeSteps:
      row_data = CaseStep.query.filter_by(id=changeStep['id'])
      if row_data.first():
        if changeStep['id'] == changeStepId:
          makeReleaseCaseIso(changeStepId, versionId, user_id, json.dumps(changeStep['values']))
        else:
          data = {
            'values': json.dumps(changeStep['values']),
          }
          row_data.update(data)
          db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': 'sucess', 'content': []}))
  else:
    return make_response(jsonify({'code': 10001, 'msg': 'no such step', 'content': []}))

@case.route('/insertStep', methods=['POST'])
def insertStep():

  user_id = session.get('user_id')
  id = request.json.get("id")
  versionId = request.json.get("versionId")
  try:
    rowData = CaseStep.query.filter_by(id = id).first()
    if rowData:
      data = CaseStep(rowData.case_id, rowData.indexId - 0.5,json.dumps(['','','','']),user_id, versionId,0)
      db.session.add(data)
      db.session.commit()
      updateCaseUser(id, user_id)
      updateStepIndex(rowData.case_id)
      return make_response(jsonify({'code': 0, 'content': None, 'msg': u'插入成功!'}))
    else:
      return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'插入失败!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'插入失败!'}))

def updateStepIndex(caseId):
  steps = CaseStep.query.filter_by(case_id=caseId).order_by(db.asc(CaseStep.indexId)).all()
  if len(steps) > 0:
    for index,row in enumerate(steps):
      data = {
        'indexId': index+1,
      }
      rowData = CaseStep.query.filter_by(id=row.id)
      rowData.update(data)
      db.session.commit()

@case.route('/deleteStep', methods=['POST'])
def deleteStep():
  user_id = session.get('user_id')
  id = request.json.get("id")
  versionId = request.json.get("versionId")
  try:
    rowData = CaseStep.query.filter_by(id=id).first()
    if versionId:
      addData = CaseStep(
        rowData.case_id,
        rowData.indexId,
        json.dumps([]),
        user_id,
        versionId,
        1,
        id,
      )
      db.session.add(addData)
      db.session.commit()
      return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功!'}))
    else:
      if rowData:
        caseId = rowData.case_id
        db.session.delete(rowData)
        db.session.commit()
        updateStepIndex(caseId)
        return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功!'}))
      else:
        return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'删除失败!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'删除失败!'}))

@case.route('/dragStep', methods=['POST'])
def dragStep():
  dragId = request.json.get("dragId")
  hoverId = request.json.get("hoverId")
  dragRowData = CaseStep.query.filter_by(id=dragId)
  hoverRowData = CaseStep.query.filter_by(id=hoverId)
  if dragRowData.first() and hoverRowData.first():

    dragNewData = {
      'indexId': hoverRowData.first().indexId
    }
    hoverNewData = {
      'indexId': dragRowData.first().indexId
    }
    dragRowData.update(dragNewData)
    hoverRowData.update(hoverNewData)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功!'}))
  else:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败!'}))

@case.route('/deleteFolder', methods=['POST'])
def deleteFolder():
  id = request.json.get("id")
  try:
    rowData = Tree.query.filter(db.and_(Tree.id == id)).first()
    if rowData.pid == 0:
      return make_response(jsonify({'code': 10001, 'content': None, 'msg': u'根目录不可删除，如不使用请关闭项目!'}))
    rowSub = Tree.query.filter(db.and_(Tree.pid == id)).all()
    if rowData and len(rowSub) == 0:
      db.session.delete(rowData)
      db.session.commit()
      return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功!'}))
    else:
      return make_response(jsonify({'code': 10001, 'content': None, 'msg': u'非空目录不可删除!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'删除失败!'}))

@case.route('/deleteCase', methods=['POST'])
def deleteCase():
  id = request.json.get("id")
  try:
    rowData = Tree.query.filter(db.and_(Tree.id == id)).first()
    caseData = CaseInfo.query.filter_by(pid=id).first()
    stepDatas = CaseStep.query.filter_by(case_id=id).all()
    if rowData:
      db.session.delete(rowData)
      if caseData:
        db.session.delete(caseData)
      if stepDatas:
        for step in stepDatas:
          db.session.delete(step)
      db.session.commit()
      return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功!'}))
    else:
      return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'删除失败!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'删除失败!'}))

@case.route('/copyCase', methods=['POST'])
def copyCase():

  user_id = session.get('user_id')
  id = request.json.get("id")
  versionId = request.json.get("versionId")
  try:
    rowData = Tree.query.filter(db.and_(Tree.id == id)).first()
    # sampleData = Sample.query.filter_by(pid=id).first()
    stepDatas = CaseStep.query.filter_by(case_id=id).all()
    # 树形表
    data = Tree(rowData.project_id, rowData.pid, rowData.name, rowData.type, rowData.user_id, rowData.index_id)
    db.session.add(data)
    db.session.commit()
    updateCaseUser(id, user_id)

    # 用例信息表
    caseData = CaseInfo.query.filter_by(pid=id).first()
    addData = CaseInfo(data.id, rowData.name, user_id, caseData.type, caseData.params, caseData.return_values)
    db.session.add(addData)
    db.session.commit()

    if len(stepDatas) > 0:
      for stepData in stepDatas:
        addData = CaseStep(data.id, stepData.indexId, stepData.values,user_id,versionId,0)
        db.session.add(addData)
        db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'复制成功!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'复制失败!'}))

@case.route('/uploadLib', methods=['POST'])
def uploadLib():
  name = request.json.get("name")
  libtype = request.json.get("libtype")
  try:
    if name:
      data = CaseLibs(name,libtype,1)
      db.session.add(data)
      db.session.commit()
      return make_response(jsonify({'code': 0, 'content':  {"id":data.id}, 'msg': u'操作成功!'}))
    else:
      return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败!'}))

@case.route('/getLibs')
def getLibs():
  status = request.values.get("status")
  if not status:
    libsData = CaseLibs.query.filter(db.and_(CaseLibs.lib_type != 1)).order_by(
      db.desc(CaseLibs.add_time)).all()
  else:
    libsData = CaseLibs.query.filter(db.and_(CaseLibs.lib_type != 1,CaseLibs.status == status)).order_by(db.desc(CaseLibs.add_time)).all()
  content = []
  if libsData:
    for item in libsData:
      content.append({
        "id": item.id,
        "name": item.name,
        "add_time": item.add_time.strftime('%Y-%m-%d %H:%M:%S'),
      })
  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))

@case.route('/uploadKeyword', methods=['POST'])
def uploadKeyword():
  keywordInfo = request.json.get("keywordInfo")
  try:
    if keywordInfo:
      # lib_id,word_type,name_en,shortdoc,doc,args,tags
      data = CaseKeywords(
        keywordInfo['lib_id'],
        keywordInfo['word_type'],
        keywordInfo['name_en'],
        keywordInfo['shortdoc'],
        keywordInfo['doc'],
        keywordInfo['args'],
        keywordInfo['tags'],
      )
      db.session.add(data)
      db.session.commit()
      return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功!'}))
    else:
      return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败!'}))
  except Exception as e:
    print(e)
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败!'}))

@case.route('/uploadTreeName', methods=['POST'])
def uploadTreeName():
  id = request.json.get("id")
  name = request.json.get("name")
  syncTreeName(id,name)
  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功!'}))

@case.route('/caseProjectConfig', methods=['GET'])
def caseProjectConfig():
  id = request.values.get("id")
  rowData = CaseProjectSetting.query.filter_by(pid=id).first()
  treeRow = Tree.query.filter_by(id=id).first()
  globalFiles = []
  globalFileDatas = ProjectFile.query.filter_by(pid=id).all()
  if globalFileDatas:
    for globalFile in globalFileDatas:
      globalFiles.append({
        'id': globalFile.id,
        'keyName': globalFile.key_name,
        'fileName': globalFile.file_name,
      })
  content = {
    'id': treeRow.id,
    'name': treeRow.name,
    'libs': [],
    'globalFiles': globalFiles,
  }
  if rowData:
    content['libs'] = json.loads(rowData.libs)
  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))

@case.route('/updateProjectLibConfig', methods=['POST'])
def updateProjectLibConfig():
  id = request.json.get("id")
  libs = request.json.get("libs")
  rowData = CaseProjectSetting.query.filter_by(pid=id)
  if rowData.first():
    data = {
      'libs': json.dumps(libs),
    }
    rowData.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))
  else:
    data = CaseProjectSetting(id,json.dumps(libs))
    db.session.add(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))

def getDefaultLibs():
  libs = []
  defaultLibs = CaseLibs.query.filter_by(lib_type=1).all()
  for lib in defaultLibs:
    libs.append(lib.id)
  return libs

def deleteDuplicate(data_list):
  # 去除列表中字段值重复的元素
  result = {i['name_en']:i for i in reversed(data_list)}.values()
  return result

@case.route('/searchKeywords', methods=['POST'])
def searchKeywords():
  caseId = request.json.get("caseId")
  words = request.json.get("words")
  if not words:
    return make_response(jsonify({'code': 10002, 'content': [], 'msg': u'请输入查询的关键字'}))
  suiteData = Tree.query.filter_by(id=caseId).first()
  suiteId = suiteData.pid
  projectId = suiteData.project_id
  libData = CaseProjectSetting.query.filter_by(pid=suiteId).first()
  libs = []
  if libData:
    libs = json.loads(libData.libs)
  defaultLibs = getDefaultLibs()
  libs += defaultLibs
  content = []
  customKeywordResult = []
  globalValues = []
  globalFiles = []
  customKeyInputParams = []
  queryWords = "%"+words+"%"
  # 全局参数匹配
  GlobalValuesData = GlobalValues.query.filter(db.and_(GlobalValues.project_id == projectId, GlobalValues.key_name.like(queryWords))).limit(5).all()
  if len(GlobalValuesData) > 0:
    for matchKeyword in GlobalValuesData:
      globalValues.append({
        'id': 'global_'+str(matchKeyword.id),
        'name_en': matchKeyword.key_name,
        'name_zh': matchKeyword.key_name,
        'valueType': matchKeyword.value_type,
      })
    newGlobalValues = deleteDuplicate(globalValues)
    content += newGlobalValues
  # 全局文件参数匹配
  GlobalFilesData = ProjectFile.query.filter(db.and_(ProjectFile.pid == projectId, ProjectFile.key_name.like(queryWords))).limit(5).all()
  if len(GlobalFilesData) > 0:
    for matchKeyword in GlobalFilesData:
      globalFiles.append({
        'id': 'file_'+str(matchKeyword.id),
        'name_en': matchKeyword.key_name,
        'name_zh': matchKeyword.key_name,
        'valueType': 6,
      })
    content += globalFiles
  # 自定义关键匹配
  matchCustomKeywordsInTree = Tree.query.filter(
    db.and_(Tree.project_id == projectId, Tree.name.like(queryWords), Tree.type == 4)).limit(5).all()
  if len(matchCustomKeywordsInTree) > 0:
    for matchKeyword in matchCustomKeywordsInTree:
      matchKeywordData = CaseInfo.query.filter_by(pid=matchKeyword.id).first()
      customKeywordResult.append({
        'id': 'custom_'+str(matchKeywordData.id),
        'name_en': matchKeywordData.name,
        'name_zh': matchKeywordData.name,
        'valueType': 0,
      })
    content += customKeywordResult
  # 检查是否为自定义关键词，并匹配传入参数
  if suiteData.type == 4:
    customCaseInfo = CaseInfo.query.filter_by(pid = caseId).first()
    if customCaseInfo and customCaseInfo.params:
      for index,param in enumerate(json.loads(customCaseInfo.params)):
        if words in param:
          customKeyInputParams.append({
            'id': 'params_' + str(index),
            'name_en': param,
            'name_zh': param,
            'valueType': 7,
          })
      content += customKeyInputParams
  # 关键词词库匹配
  results = CaseKeywords.query.filter(db.and_(CaseKeywords.lib_id.in_(libs),
                                              db.or_(CaseKeywords.name_en.like(queryWords),
                                                     CaseKeywords.name_zh.like(queryWords)))).limit(10).all()
  for item in results:
    content.append({
      'id': item.id,
      'name_en': item.name_en,
      'name_zh': item.name_zh,
      'valueType': 0,
    })

  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))

@case.route('/addDebugTask', methods=['POST'])
def addDebugTask():

  user_id = session.get('user_id')
  caseId = request.json.get("caseId")
  versionId = request.json.get("versionId")
  valueTypeData = request.json.get("valueType")
  # 任务全局参数类型，默认是正式版参数
  valueType = 1
  if valueTypeData:
    valueType = valueTypeData
  caseSteps = CaseStep.query.filter_by(case_id=caseId).all()
  if len(caseSteps) < 1:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'用例异常'}))
  caseData = Tree.query.filter_by(id=caseId).first()
  projectId = caseData.project_id
  data = Task(u'调试任务', 1, 0, json.dumps([caseId]), '', user_id, projectId, valueType, 1, 0, versionId, '')
  db.session.add(data)
  db.session.commit()
  subprocess.Popen("python debugCaseScript.py runScript -i %s"%data.id, shell=True)
  return make_response(jsonify({'code': 0, 'content': {'taskid': data.id}, 'msg': u'开始执行'}))

@case.route('/addStepIndexDesc', methods=['POST'])
def addStepIndexDesc():
  stepId = request.json.get("stepId")
  stepIndex = request.json.get("stepIndex")
  indexType = request.json.get("indexType")
  linkId = request.json.get("linkId")
  base64Image = request.json.get("base64Image")
  rowData = StepIndexDesc.query.filter(
    db.and_(StepIndexDesc.step_id == stepId, StepIndexDesc.step_index == stepIndex))
  if rowData.first():
    elementCapPath = ''
    if indexType == 2:
      elementCapPath = saveBase64ToImage(base64Image)
    data = {
      'index_type': indexType,
      'link_id': linkId,
      'link_img': elementCapPath,
    }
    rowData.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'msg': '修改成功', 'content': {'id': rowData.first().id}}))

  if indexType in [1, 3]:
    data = StepIndexDesc(stepId, stepIndex, indexType, linkId, '')
  if indexType == 2:
    elementCapPath = saveBase64ToImage(base64Image)
    data = StepIndexDesc(stepId, stepIndex, indexType, '', elementCapPath)
  db.session.add(data)
  db.session.commit()
  return make_response(jsonify({'code': 0, 'content': {'id': data.id}, 'msg': u'添加成功'}))

@case.route('/getStepIndexDesc', methods=['POST'])
def getStepIndexDesc():
  stepId = request.json.get("stepId")
  stepIndex = request.json.get("stepIndex")
  content = {}
  rowData = StepIndexDesc.query.filter(db.and_(StepIndexDesc.step_id == stepId,StepIndexDesc.step_index == stepIndex)).first()
  if rowData:
    if rowData.index_type == 1:
      keywordData = CaseKeywords.query.filter_by(id=rowData.link_id).first()
      if keywordData:
        eventDoc = {
          'id': keywordData.id,
          'name_en': keywordData.name_en,
          'name_zh': keywordData.name_zh,
          'shortdoc': keywordData.shortdoc,
          'doc': keywordData.doc,
          'args': keywordData.args,
          'add_time': keywordData.add_time.strftime('%Y-%m-%d %H:%M:%S'),
        }
        content = {
          'indexType': 1,
          'indexDoc': eventDoc,
        }
    if rowData.index_type == 2:
      content = {
        'indexType': 2,
        'indexDoc': rowData.link_img,
      }
    if rowData.index_type == 3:
      keywordData = CaseInfo.query.filter_by(id = rowData.link_id).first()
      if keywordData:
        eventDoc = {
          'id': keywordData.id,
          'name_en': keywordData.name,
          'name_zh': keywordData.name,
          'doc': keywordData.doc,
          'args': keywordData.params,
          'add_time': keywordData.add_time.strftime('%Y-%m-%d %H:%M:%S'),
        }
        content = {
          'indexType': 3,
          'indexDoc': eventDoc,
        }

  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))

@case.route('/deleteStepIndexDesc', methods=['POST'])
def deleteStepIndexDesc():
  stepId = request.json.get("stepId")
  stepIndex = request.json.get("stepIndex")
  rowData = StepIndexDesc.query.filter(db.and_(StepIndexDesc.step_id == stepId,StepIndexDesc.step_index == stepIndex)).first()
  if rowData:
    db.session.delete(rowData)
    db.session.commit()
  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功'}))

@case.route('/updateStepIndexDesc', methods=['POST'])
def updateStepIndexDesc():
  stepId = request.json.get("stepId")
  indexId = request.json.get("indexId")
  rowData = StepIndexDesc.query.filter_by(id=indexId)
  if rowData.first():
    data = {
      'step_id': stepId
    }
    rowData.update(data)
    db.session.commit()
  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))
