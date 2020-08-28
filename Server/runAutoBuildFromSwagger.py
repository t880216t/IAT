#!venv/bin/python
#-*-coding:utf-8-*-

__author__="orion-c"

from xml.etree import ElementTree as et
import sys, importlib
from flask_script import Manager
from app.tables.IAT import Tree, iatCaseInfo, iatKeyValues
from app import app,db
import json

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

def getCaseInfo(fileName):
    cases = []
    data = None
    if fileName.split('.')[1] == 'json':
        with open(fileName,'r', encoding='utf-8') as f:
            data = json.load(f)
    path = data.get("paths")
    for path_key, path_value in path.items():
      if isinstance(path_value, dict):
        for method, sample_value in path_value.items():
          parameters = []
          paramType = 1
          if isinstance(sample_value, dict):
            if isinstance(sample_value.get("parameters"), list):
              if sample_value.get("parameters").__len__() > 0:
                for param in sample_value.get("parameters"):
                  parameters.append({
                    "key": param.get("name"),
                    "value": param.get("description"),
                  })
            if isinstance(sample_value.get("consumes"),list):
              if sample_value.get("consumes").__len__() > 0:
                if sample_value.get("consumes")[0] == 'application/x-www-form-urlencoded':
                  paramType = 1
                elif sample_value.get("consumes")[0] == 'multipart/form-data':
                  paramType = 3
            info = {
              'name': sample_value['summary'],
              'method': method,
              'path': path_key,
              'domain': '',
              'params': parameters,
              'paramType': paramType,
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