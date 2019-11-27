# -*-coding:utf-8-*-
from flask import Blueprint, jsonify, make_response, session, request
from app.tables.IAT import Task, Tree, iatKeyValues, iatCaseInfo, iatShellData, GlobalValues
from app.tables.User import users
import os, hashlib, subprocess, json, time, datetime, binascii, requests
from sqlalchemy import extract
from app import db, app

iatCase = Blueprint('iatCase', __name__)


@iatCase.route('/getCaseData', methods=['GET'])
def getCaseData():
  user_id = session.get('user_id')
  caseId = request.values.get("caseId")
  treeData = Tree.query.filter_by(id=caseId).first()
  content = {}
  if treeData:
    # 请求头
    headerValues = []
    headerValueDatas = iatKeyValues.query.filter(db.and_(iatKeyValues.value_type == 1, iatKeyValues.pid == caseId)) \
      .order_by(db.asc(iatKeyValues.add_time)).all()
    if headerValueDatas:
      for item in headerValueDatas:
        headerValues.append({
          'id': item.id,
          'key': item.key_name,
          'value': item.key_value,
          'add_time': item.add_time,
        })
    headerValues.append({
      'type': 'add',
    })
    # 请求参数
    paramsValues = []
    paramsValueDatas = iatKeyValues.query.filter(db.and_(iatKeyValues.value_type == 2, iatKeyValues.pid == caseId)) \
      .order_by(db.asc(iatKeyValues.add_time)).all()
    if paramsValueDatas:
      for item in paramsValueDatas:
        paramsValues.append({
          'id': item.id,
          'key': item.key_name,
          'value': item.key_value,
          'add_time': item.add_time,
        })
    paramsValues.append({
      'type': 'add',
    })
    # 前置shell
    preShell = None
    preShellData = iatShellData.query.filter(
      db.and_(iatShellData.shell_type == 1, iatShellData.pid == caseId)).first()
    if preShellData:
      preShell = preShellData.shell_data

    # 后置shell
    postShell = None
    postShellData = iatShellData.query.filter(
      db.and_(iatShellData.shell_type == 2, iatShellData.pid == caseId)).first()
    if postShellData:
      postShell = postShellData.shell_data

    # 文本校验
    textAssertValues = []
    textAssertDatas = iatKeyValues.query.filter(db.and_(iatKeyValues.value_type == 3, iatKeyValues.pid == caseId)) \
      .order_by(db.asc(iatKeyValues.add_time)).all()
    if textAssertDatas:
      for item in textAssertDatas:
        textAssertValues.append({
          'id': item.id,
          'key': item.key_name,
          'value': item.key_value,
          'add_time': item.add_time,
        })
    textAssertValues.append({
      'type': 'add',
    })

    # json校验
    jsonAssertValues = []
    jsonAssertDatas = iatKeyValues.query.filter(db.and_(iatKeyValues.value_type == 4, iatKeyValues.pid == caseId)) \
      .order_by(db.asc(iatKeyValues.add_time)).all()
    if jsonAssertDatas:
      for item in jsonAssertDatas:
        jsonAssertValues.append({
          'id': item.id,
          'key': item.key_name,
          'value': item.key_value,
          'add_time': item.add_time,
        })
    jsonAssertValues.append({
      'type': 'add',
    })

    # json参数化提取
    jsonExtractValues = []
    jsonExtractDatas = GlobalValues.query.filter(db.and_(GlobalValues.value_type == 3, GlobalValues.case_id == caseId)) \
      .order_by(db.asc(GlobalValues.add_time)).all()
    if jsonExtractDatas:
      for item in jsonExtractDatas:
        jsonExtractValues.append({
          'id': item.id,
          'key': item.key_name,
          'value': item.key_value,
          'add_time': item.add_time,
        })
    jsonExtractValues.append({
      'type': 'add',
    })

    caseInfoData = iatCaseInfo.query.filter(db.and_(iatCaseInfo.pid == caseId)).first()
    method, path, paramType, assertType, extractType, bodyData, domain = '', '', '', '', '', '', ''
    if caseInfoData:
      method, path, paramType, assertType, extractType, bodyData, domain = \
        caseInfoData.method, \
        caseInfoData.path, \
        caseInfoData.param_type, \
        caseInfoData.assert_type, \
        caseInfoData.extract_type, \
        caseInfoData.body_data,\
        caseInfoData.domain,

    content = {
      'id': treeData.id,
      'name': treeData.name,
      'headerValues': headerValues,
      'paramsValues': paramsValues,
      'textAssertValues': textAssertValues,
      'jsonAssertValues': jsonAssertValues,
      'jsonExtractValues': jsonExtractValues,
      'preShell': preShell,
      'postShell': postShell,
      'method': method,
      'domain': domain,
      'path': path,
      'paramType': paramType,
      'assertType': assertType,
      'extractType': extractType,
      'bodyData': bodyData,
    }

  return make_response(jsonify({'code': 0, 'content': content, 'msg': u'新建成功!'}))


@iatCase.route('/addEmtpyValue', methods=['POST'])
def addEmtpyValue():
  user_id = session.get('user_id')
  valueType = request.json.get("valueType")
  caseId = request.json.get("caseId")
  data = iatKeyValues('', '', caseId, user_id, valueType)
  db.session.add(data)
  db.session.commit()

  return make_response(jsonify({'code': 0, 'content': {'id': data.id}, 'msg': u'新建成功!'}))


@iatCase.route('/deleteValue', methods=['POST'])
def deleteValue():
  user_id = session.get('user_id')
  valueId = request.json.get("valueId")
  rowData = iatKeyValues.query.filter_by(id=valueId).first()
  if rowData:
    db.session.delete(rowData)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'删除成功!'}))
  else:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'删除失败!'}))


@iatCase.route('/updateKeyValues', methods=['POST'])
def updateKeyValues():
  id = request.json.get("valueId")
  keyName = request.json.get("keyName")
  keyValue = request.json.get("keyValue")
  rowData = iatKeyValues.query.filter_by(id=id)
  if rowData.first():
    data = {
      'key_name': keyName,
      'key_value': keyValue,
    }
    rowData.update(data)
    db.session.commit()

  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))


def deleteDuplicate(data_list):
  # 去除列表中字段值重复的元素
  result = {i['key_name']: i for i in reversed(data_list)}.values()
  return result


@iatCase.route('/searchKeywords', methods=['POST'])
def searchKeywords():
  caseId = request.json.get("caseId")
  words = request.json.get("words")
  if not words:
    return make_response(jsonify({'code': 10002, 'content': [], 'msg': u'请输入查询的关键字'}))
  content = []
  globalValues = []
  queryWords = "%" + words + "%"
  projectId = Tree.query.filter_by(id=caseId).first().project_id
  GlobalValuesData = GlobalValues.query.filter(
    db.and_(GlobalValues.key_name.like(queryWords), GlobalValues.project_id == projectId)).limit(10).all()
  if len(GlobalValuesData) > 0:
    for matchKeyword in GlobalValuesData:
      globalValues.append({
        'id': matchKeyword.id,
        'key_name': '${' + matchKeyword.key_name + '}',
        'valueType': matchKeyword.value_type,
      })
    newGlobalValues = deleteDuplicate(globalValues)
    content += newGlobalValues

  return make_response(jsonify({'code': 0, 'content': content, 'msg': u''}))


@iatCase.route('/updateShellData', methods=['POST'])
def updateShellData():
  caseId = request.json.get("caseId")
  shellType = request.json.get("shellType")
  editValue = request.json.get("editValue")
  rowData = iatShellData.query.filter(db.and_(iatShellData.pid == caseId, iatShellData.shell_type == shellType))
  if rowData.first():
    data = {
      'shell_type': shellType,
      'shell_data': editValue,
    }
    rowData.update(data)
    db.session.commit()
  else:
    data = iatShellData(caseId, shellType, editValue)
    db.session.add(data)
    db.session.commit()

  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))


@iatCase.route('/updateCaseData', methods=['POST'])
def updateCaseData():
  user_id = session.get('user_id')
  caseId = request.json.get("caseId")
  caseInfo = request.json.get("caseInfo")
  rowData = iatCaseInfo.query.filter(db.and_(iatCaseInfo.pid == caseId))
  if rowData.first():
    data = {
      'domain': caseInfo['domain'],
      'method': caseInfo['method'],
      'path': caseInfo['path'],
      'param_type': caseInfo['paramType'],
      'assert_type': caseInfo['assertType'],
      'extract_type': caseInfo['extractType'],
      'user_id': user_id,
    }
    rowData.update(data)
    db.session.commit()
  else:
    data = iatCaseInfo(
      caseId,
      caseInfo['domain'],
      caseInfo['method'],
      caseInfo['path'],
      caseInfo['paramType'],
      caseInfo['assertType'],
      caseInfo['extractType'],
      user_id,
    )
    db.session.add(data)
    db.session.commit()

  return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))


@iatCase.route('/updateCaseBodyData', methods=['POST'])
def updateCaseBodyData():
  user_id = session.get('user_id')
  caseId = request.json.get("caseId")
  bodyData = request.json.get("bodyData")
  rowData = iatCaseInfo.query.filter(db.and_(iatCaseInfo.pid == caseId))
  if rowData.first():
    data = {
      'body_data': bodyData,
      'user_id': user_id,
    }
    rowData.update(data)
    db.session.commit()
    return make_response(jsonify({'code': 0, 'content': None, 'msg': u'操作成功'}))
  else:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': u'操作失败'}))


@iatCase.route('/debugCase', methods=['POST'])
def debugCase():
  user_id = session.get('user_id')
  caseId = request.json.get("caseId")
  domain = request.json.get("domain")
  proxy = request.json.get("proxy")
  valueType = request.json.get("valueType")
  rowData = iatCaseInfo.query.filter_by(pid=caseId).first()
  if rowData:
    projectId = Tree.query.filter_by(id=caseId).first().project_id
    # name,task_desc,project_id,task_type,run_time,domain,headers,params,proxy,case,user_id,status,value_type
    data = Task('调试任务', '', projectId, 3, '00:00', domain, '', json.dumps([]), proxy, json.dumps([caseId]), user_id, 0, valueType)
    db.session.add(data)
    db.session.commit()
    subprocess.Popen("python debugApiCaseScript.py runScript -i %s" % data.id, shell=True)
    return make_response(jsonify({'code': 0, 'content': { 'id': data.id }, 'msg': ''}))
  else:
    return make_response(jsonify({'code': 10002, 'content': None, 'msg': '用例信息异常！'}))
