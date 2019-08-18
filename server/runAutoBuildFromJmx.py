#!venv/bin/python
#-*-coding:utf-8-*-

__author__="orion-c"

from xml.etree import ElementTree as et
import sys, importlib
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

def getCaseInfo(fileName):
  root = et.parse(fileName)
  cases = []
  for each in root.getiterator("HTTPSamplerProxy"):
    testname = each.attrib['testname']
    domain = ''
    protocol = ''
    port = ''
    method = ''
    path = ''
    paramType = 1
    params = []
    for childNode in each.getchildren():
      if childNode.attrib['name'] == 'HTTPSampler.domain':
        domain = childNode.text if childNode.text else ''
      if childNode.attrib['name'] == 'HTTPSampler.port':
        port = ':' + childNode.text if childNode.text else ''
      if childNode.attrib['name'] == 'HTTPSampler.protocol':
        protocol = childNode.text + '://' if childNode.text else ''
      if childNode.attrib['name'] == 'HTTPSampler.path':
        path = childNode.text if childNode.text else ''
      if childNode.attrib['name'] == 'HTTPSampler.DO_MULTIPART_POST':
        if childNode.text == 'true':
          paramType = 3
      if childNode.attrib['name'] == 'HTTPSampler.postBodyRaw':
        if childNode.text == 'true':
          paramType = 4
      if childNode.attrib['name'] == 'HTTPSampler.method':
        method = childNode.text
      if childNode.attrib['name'] == 'HTTPsampler.Arguments':
        for paramsContainerNode in childNode.getchildren():
          for paramsNode in paramsContainerNode.getchildren():
            key = ''
            value = ''
            for paramsNodeChildren in paramsNode.getchildren():
              if paramsNodeChildren.attrib['name'] == 'Argument.name':
                key = paramsNodeChildren.text
              if paramsNodeChildren.attrib['name'] == 'Argument.value':
                value = paramsNodeChildren.text
            params.append({
              "key": key,
              "value": value,
            })

    info = {
      'name': testname,
      'method': method,
      'path': path,
      'domain': protocol + domain + port,
      'params': params,
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
