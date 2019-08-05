#!venv/bin/python
#-*-coding:utf-8-*-
import os,json,binascii,hashlib, shutil, sys
from flask_script import Manager
from app.tables.UAT import Tree,CaseInfo,CaseStep,CaseLibs,ProjectFile,CaseProjectSetting,Task, GlobalValues
from app import app,db
from datetime import datetime
from xml.dom.minidom import parse
import xml.dom.minidom

manager = Manager(app)

def encrypt_name(name, salt=None, encryptlop=30):
  if not salt:
    salt = binascii.hexlify(os.urandom(32)).decode()
  for i in range(encryptlop):
    name = hashlib.sha1(str(name + salt).encode('utf-8')).hexdigest()
  return name

#清除文件
def clear_project_file(project_path):
    if os.path.exists(project_path):
        delList = os.listdir(project_path)
        for f in delList:
            filePath = os.path.join(project_path, f)
            if os.path.isfile(filePath):
                try:
                    os.remove(filePath)
                    print(filePath + " was removed!")
                except:
                    print("--------------------------------删除旧文件失败")
            elif os.path.isdir(filePath):
                shutil.rmtree(filePath, True)
            print("Directory: " + filePath + " was removed!")
        try:
          os.rmdir(project_path)
        except:
          print("delete has some error")

def getTaskInfo(taskId):
  rowData = Task.query.filter_by(id=taskId).first()
  caseIds = json.loads(rowData.case_id)
  valueType = rowData.value_type
  versionId = rowData.version_id
  projectId = Tree.query.filter_by(id=caseIds[0]).first().project_id
  projectRootData = Tree.query.filter(db.and_(Tree.project_id == projectId,Tree.pid == 0)).first()
  projectConfig = CaseProjectSetting.query.filter_by(pid=projectRootData.id).first()
  libs = []
  if projectConfig:
    libDatas = CaseLibs.query.filter(db.and_(CaseLibs.id.in_(json.loads(projectConfig.libs)))).all()
    for lib in libDatas:
      libs.append(lib.name)

  # 查出所有勾选用例的数据
  caseDatas = []
  for caseId in caseIds:
    caseInfo = Tree.query.filter_by(id=caseId).first()
    caseDetailData = CaseInfo.query.filter_by(pid=caseId).first()
    caseSteps = []
    if versionId:
      caseStepDatas = CaseStep.query.filter(
        db.and_(
          CaseStep.case_id == caseId,
          CaseStep.delete_flag == 0,
          db.or_(CaseStep.version_id == versionId, CaseStep.version_id == None)
        ),
      ).order_by(db.asc(CaseStep.indexId)).all()
    else:
      caseStepDatas = CaseStep.query.filter(db.and_(CaseStep.case_id == caseId, CaseStep.version_id == None)).order_by(
        db.asc(CaseStep.indexId)).all()
    for caseStep in caseStepDatas:
      caseSteps.append({
        'values': json.loads(caseStep.values),
        'id': caseStep.id,
      })
    deleteStepIds = CaseStep.query.filter(db.and_(CaseStep.delete_flag == 1, CaseStep.version_id == versionId)).all()
    if deleteStepIds:
      for deleteStep in deleteStepIds:
        for caseStep in caseSteps:
          if deleteStep.pid == caseStep['id']:
            caseSteps.remove(caseStep)
    releaseIsoStepIds = CaseStep.query.filter(
      db.and_(CaseStep.delete_flag == 0, CaseStep.version_id == versionId)).all()
    if releaseIsoStepIds:
      for releaseIsoStep in releaseIsoStepIds:
        for caseStep in caseSteps:
          if releaseIsoStep.pid == caseStep['id']:
            caseSteps.remove(caseStep)
    setUpData = caseDetailData.set_up if caseDetailData.set_up else '[]'
    tearDownData = caseDetailData.tear_down if caseDetailData.tear_down else '[]'
    caseDatas.append({
      'case_name': caseInfo.name,
      'caseId': caseId,
      'suiteId':caseInfo.pid,
      'case_steps':caseSteps,
      'setUp': json.loads(setUpData),
      'tearDown': json.loads(tearDownData),
    })

  test_suites = []
  testSuiteIds = Tree.query.filter(db.and_(Tree.id.in_(caseIds))).with_entities(Tree.pid).distinct().all()[0]
  for suiteId in testSuiteIds:
    suiteData = Tree.query.filter_by(id=suiteId).first()
    test_cases = []
    for caseData in caseDatas:
      if caseData['suiteId'] == suiteId:
        test_cases.append(caseData)
    suiteConfig = CaseProjectSetting.query.filter_by(pid=suiteId).first()
    suitelibs = []
    if suiteConfig:
      suiteLibDatas = CaseLibs.query.filter(db.and_(CaseLibs.id.in_(json.loads(suiteConfig.libs)))).all()
      for lib in suiteLibDatas:
        suitelibs.append(lib.name)
    test_suites.append({
      'name': suiteData.name,
      'suiteId': suiteId,
      'libs': suitelibs,
      'test_cases': test_cases,
    })

  globalValuesData = GlobalValues.query.filter(db.and_(GlobalValues.project_id == projectId, GlobalValues.value_type == valueType)).all()
  globalValues = []
  if globalValuesData:
    for valueData in globalValuesData:
      globalValues.append({
        'name': valueData.key_name,
        'value': valueData.key_value,
      })
  # 全局文件参数
  globalFilesData = ProjectFile.query.filter(db.and_(ProjectFile.pid == projectId)).all()
  if globalFilesData:
    for valueData in globalFilesData:
      if 'win32' in sys.platform:
        appRootPath = app.root_path.replace('\\', '\\\\')
        fileData = appRootPath +'\\\\'+ valueData.key_value
      else:
        fileData = app.root_path + '/' + valueData.key_value
      globalValues.append({
        'name': valueData.key_name,
        'value': fileData,
      })

  taskInfo = {
    'project_name': projectRootData.name,
    'libs': libs,
    'test_suites': test_suites,
    'globalValues': globalValues,
  }
  return taskInfo

def getCustomKeywords(taskId):
  rowData = Task.query.filter_by(id=taskId).first()
  caseIds = json.loads(rowData.case_id)
  projectData = Tree.query.filter_by(id=caseIds[0]).first()
  projectId = projectData.project_id
  keywordRootId = projectData.pid
  keywordRows = Tree.query.filter(db.and_(Tree.project_id == projectId,Tree.type == 4)).all()

  keywordRootConfig = CaseProjectSetting.query.filter_by(pid=keywordRootId).first()
  keywordRootlibs = []
  if keywordRootConfig:
    keywordRootLibDatas = CaseLibs.query.filter(db.and_(CaseLibs.id.in_(json.loads(keywordRootConfig.libs)))).all()
    for lib in keywordRootLibDatas:
      keywordRootlibs.append(lib.name)

  keywordDatas = []
  for keyword in keywordRows:
    keywordId = keyword.id
    keyInfo = CaseInfo.query.filter_by(pid = keywordId).first()
    caseSteps = []
    caseStepDatas = CaseStep.query.filter_by(case_id=keywordId).order_by(db.asc(CaseStep.indexId)).all()
    for caseStep in caseStepDatas:
      caseSteps.append({
        'values': json.loads(caseStep.values)
      })
    keywordDatas.append({
      'name': keyInfo.name,
      'Arguments': json.loads(keyInfo.params),
      'returns': json.loads(keyInfo.return_values),
      'caseSteps': caseSteps,
    })
  return keywordDatas, keywordRootlibs

def buildTaskProject(taskInfo,taskRootPath):
  taskRootPath = 'taskFile/'+taskRootPath
  if not os.path.exists(taskRootPath):
    os.makedirs(taskRootPath)
  # 创建项目目录
  projectDir = taskRootPath+'/'+taskInfo['project_name']
  os.makedirs(projectDir)

  # 创建项目初始化文件
  with open(projectDir+'/__init__.robot', 'w', encoding='utf-8') as initFile:
    initFile.writelines('*** Settings ***\n')
    for lib in taskInfo['libs']:
      initFile.writelines('Library    {lib}\n'.format(lib=lib))

  # 创建项目全局参数文件
  with open(projectDir+'/globalValues.py', 'w', encoding='utf-8') as valuesFile:
    for globalValue in taskInfo['globalValues']:
      valuesFile.writelines("{key} = '{value}'\n".format(key=globalValue['name'], value=globalValue['value']))

  # 创建测试集及所包含的用例
  for testSuite in taskInfo['test_suites']:
    with open(projectDir + '/'+testSuite['name']+'.robot', 'w', encoding='utf-8') as suiteFile:
      suiteFile.writelines('*** Settings ***\n')
      suiteFile.writelines('Suite Teardown    close_all\n')
      suiteFile.writelines('Resource    customKeyword.robot\n')
      for lib in testSuite['libs']:
        suiteFile.writelines('Library    {lib}\n'.format(lib=lib))
      suiteFile.writelines('Variables    globalValues.py\n')
      suiteFile.writelines('\n')
      suiteFile.writelines('*** Test Cases ***\n')
      # 用例信息
      for case in testSuite['test_cases']:
        suiteFile.writelines('{caseName}\n'.format(caseName=case['case_name']))
        # 用例前置处理
        if case['setUp']:
          setUp = '    '.join(case['setUp'])
          suiteFile.writelines('    [Setup]    {setUp}\n'.format(setUp=setUp))
        for caseStep in case['case_steps']:
          step = '    '.join(caseStep['values'])
          suiteFile.writelines('    {step}\n'.format(step=step))
        # 用例后置处理
        if case['tearDown']:
          tearDown = '    '.join(case['tearDown'])
          suiteFile.writelines('    [Teardown]    {tearDown}\n'.format(tearDown=tearDown))
        suiteFile.writelines('\n')
  return projectDir

def buildCustomKeywordFile(projectDir,customKeywords, keywordRootlibs):
  with open(projectDir + '/customKeyword.robot', 'w', encoding='utf-8') as keywordFile:
    if len(keywordRootlibs) > 0:
      keywordFile.writelines('*** Settings ***\n')
      for lib in keywordRootlibs:
        keywordFile.writelines('Library    {lib}\n'.format(lib=lib))
      keywordFile.writelines('\n')
    keywordFile.writelines('*** Keywords ***\n')
    # 默认关键词
    keywordFile.writelines('close_all\n')
    keywordFile.writelines('    Close All Browsers\n')
    keywordFile.writelines('\n')
    for keywordData in customKeywords:
      keywordFile.writelines('{name}\n'.format(name=keywordData['name']))
      if keywordData['Arguments']:
        Arguments = '    '.join(keywordData['Arguments'])
        keywordFile.writelines('    [Arguments]    {Arguments}\n'.format(Arguments=Arguments))
      for caseStep in keywordData['caseSteps']:
        # 这里可能存在某些api不是放在第一个参数的，需要归类根据type判断
        step = '    '.join(caseStep['values'])
        keywordFile.writelines('    {step}\n'.format(step=step))
      if keywordData['returns']:
        returns = '    '.join(keywordData['returns'])
        keywordFile.writelines('    [Return]    {returns}\n'.format(returns=returns))
      keywordFile.writelines('\n')

def excuteScript(projectDir):
  cmd = 'robot --outputdir {projectDir} {projectDir}'.format(projectDir=projectDir)
  os.system(cmd)

def alasyRootLog(projectDir):
  logFile = projectDir + '/output.xml'
  # 使用Minidom解析器打开xml文档
  DOMTree = xml.dom.minidom.parse(logFile)
  robotDom = DOMTree.documentElement

  projectDom = robotDom.getElementsByTagName("suite")[0]

  logs = []
  for suite in projectDom.childNodes:
    if suite.nodeName == 'suite':
      cases = []
      for case in suite.childNodes:
        if case.nodeName == 'test':
          steps = []
          for step in case.childNodes:
            if step.nodeName == 'kw':
              status = ''
              msg = ''
              msgLevel = ''
              for stepNode in step.childNodes:
                if stepNode.nodeName == 'status':
                  status = stepNode.getAttribute("status")
                if stepNode.nodeName == 'msg':
                  msg = stepNode.firstChild.data
                  msgLevel = stepNode.getAttribute("level")
              steps.append({
                'name': step.getAttribute("name"),
                'status': status,
                'msgLevel': msgLevel,
                'msg': msg,
              })
          cases.append({
            'name': case.getAttribute("name"),
            'id': case.getAttribute("id"),
            'steps': steps,
          })
      logs.append({
        'name': suite.getAttribute("name"),
        'id': suite.getAttribute("id"),
        'cases': cases,
      })
  return logs

def saveLogToDB(taskId,logs):
  logStr = json.dumps(logs)
  data = {
    'task_log': logStr
  }
  rowData = Task.query.filter_by(id=taskId)
  rowData.update(data)
  db.session.commit()

def setTaskStatus(taskId,status):
  data = {
    'status': status
  }
  rowData = Task.query.filter_by(id=taskId)
  rowData.update(data)
  db.session.commit()

@manager.option('-i','--task_id',dest='task_id',default='')
def runScript(task_id):
  setTaskStatus(task_id, 1)
  try:
    now = datetime.now().strftime('%Y-%m-%d_%H_%M_%S')
    taskRootPath = encrypt_name(now)
    taskInfo = getTaskInfo(task_id)
    customKeywords, keywordRootlibs = getCustomKeywords(task_id)
    projectDir = buildTaskProject(taskInfo,taskRootPath)
    buildCustomKeywordFile(projectDir,customKeywords, keywordRootlibs)
    excuteScript(projectDir)
    logs = alasyRootLog(projectDir)
    saveLogToDB(task_id,logs)
    setTaskStatus(task_id, 3)
    # clear_project_file('taskFile/'+taskRootPath)
  except Exception as e:
    print(e)
    setTaskStatus(task_id, 4)


if __name__ == "__main__":
    manager.run()

