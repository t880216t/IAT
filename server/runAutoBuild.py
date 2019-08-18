#!venv/bin/python
#-*-coding:utf-8-*-
__author__="orion-c"

import json,importlib,sys
from flask_script import Manager
from app.tables.IAT import Tree, iatCaseInfo, iatKeyValues
from app import app,db

default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
  importlib.reload(sys)
  sys.setdefaultencoding(default_encoding)

manager = Manager(app)

def addCase(userId,projectId,name):
  index_id = Tree.query.filter(db.and_(Tree.project_id == projectId, )).order_by(
    db.desc(Tree.index_id)).first().index_id
  pid = Tree.query.filter_by(project_id=projectId).first().id
  data = Tree(projectId, pid, name, 2, userId, index_id + 1)
  db.session.add(data)
  db.session.commit()
  return data.id

def addCaseData(caseId, userId, caseInfo):
  data = iatCaseInfo(
    caseId,
    caseInfo['domain'],
    caseInfo['method'],
    caseInfo['path'],
    caseInfo['paramType'],
    caseInfo['assertType'],
    caseInfo['extractType'],
    userId,
  )
  db.session.add(data)
  db.session.commit()

def addParams(caseId,userId, param):
  data = iatKeyValues(param['key'], param['value'], caseId, userId, 2)
  db.session.add(data)
  db.session.commit()

def updateBodyData(caseId,bodyData):
  rowData = iatCaseInfo.query.filter(db.and_(iatCaseInfo.pid == caseId))
  if rowData.first():
    data = {
      'body_data': bodyData,
    }
    rowData.update(data)
    db.session.commit()

def getPath(url):
  if '?' in url:
    url = url[0:url.rfind('?', 1)]
  url = url.split('/')
  domain = ''
  path = ''
  for index,p in enumerate(url):
    if index>2:
      path += ("/"+p)
    else:
      domain += ("/"+p)
  return domain[1:len(domain)], path

def getCaseInfo(fileName):
  with open(fileName, 'r', encoding='utf-8') as f:
    harData = json.loads(f.read())
  if not harData:
    print('文件错误！')
    return
  cases = []
  for item in harData['log']['entries']:
    method = item['request']['method']
    url = item['request']['url']
    domain, path = getPath(url)
    name = path.replace("/", "_")[1:len(path)]
    paramType = 1
    for header in item['request']['headers']:
      if "application/json" in header["value"]:
        paramType = 2
      elif "multipart/form-data" in header["value"]:
        paramType = 3
    jsonParams = False
    if method == 'POST':
      try:
        if "application/json" in item['request']['postData']['mimeType']:
          jsonParams = True
          paramType = 4
          params = item['request']['postData']['text']
        else:
          params = item['request']['postData']['params']
      except:
        jsonParams = False
        params = item['request']['queryString']
    if method == 'GET':
      params = item['request']['queryString']
    new_params = []
    if not jsonParams:
      for param in params:
        new_params.append({
          "key":param["name"],
          "value":param["value"],
        })
    else:
      new_params.append({
        "key":'',
        "value": params
      })
    info = {
      'name': name,
      'method': method,
      'path': path,
      'domain': domain,
      'paramType': paramType,
      'params': new_params,
      'assertType': 1,
      'extractType': 0,
    }
    cases.append(info)
  return cases

@manager.option('-u','--userId',dest='userId',default='')
@manager.option('-p','--projectId',dest='projectId',default='')
@manager.option('-f','--fileName',dest='fileName',default='')
def runScript(userId, projectId, fileName):
  casesInfo = getCaseInfo(fileName)
  for caseInfo in casesInfo:
    caseId = addCase(userId, projectId, caseInfo['name'])
    addCaseData(caseId, userId, caseInfo)
    if caseInfo['paramType'] == 4 and caseInfo['params'][0]['value']:
      updateBodyData(caseId, caseInfo['params'][0]['value'])
    else:
      for param in caseInfo['params']:
        addParams(caseId, userId, param)
  print('导入成功')


if '__main__' == __name__:
  manager.run()
