#!venv/bin/python
#-*-coding:utf-8-*-
import os, json, binascii, hashlib, shutil, zipfile, sys, re
from flask_script import Manager
from app.tables.UAT import TimTaskLog,Tree,CaseInfo,CaseStep,CaseLibs,HomeDayExcuteCount,CaseProjectSetting,Task, GlobalValues, ProxyConfig, FailCaseLog, ProjectFile
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

def getTaskInfo(taskId, taskRootPath):
  # 任务信息
  rowData = Task.query.filter_by(id=taskId).first()
  caseIds = json.loads(rowData.case_id)
  valueType = rowData.value_type
  browserType = rowData.browser_type
  proxyType = rowData.proxy_type
  taskName = rowData.name
  taskType = rowData.task_type

  projectId = Tree.query.filter_by(id=caseIds[0]).first().project_id
  projectRootData = Tree.query.filter(db.and_(Tree.project_id == projectId,Tree.pid == 0)).first()
  projectConfig = CaseProjectSetting.query.filter_by(pid=projectRootData.id).first()
  libDatas = CaseLibs.query.filter(db.and_(CaseLibs.id.in_(json.loads(projectConfig.libs)))).all()
  libs = []
  for lib in libDatas:
    libs.append(lib.name)

  # 查出所有勾选用例的数据
  caseDatas = []
  for caseId in caseIds:
    caseInfo = Tree.query.filter_by(id=caseId).first()
    caseDetailData = CaseInfo.query.filter_by(pid=caseId).first()
    caseSteps = []
    caseStepDatas = CaseStep.query.filter_by(case_id=caseId).order_by(db.asc(CaseStep.indexId)).all()
    for caseStep in caseStepDatas:
      stepData = json.loads(caseStep.values)
      if stepData[0] == 'Open Browser':
        # 根据任务增加浏览器配置
        if browserType == 1:
          if len(stepData) > 2:
            stepData[2] = 'firefox'
          else:
            stepData.append('firefox')
        if browserType == 2:
          if len(stepData) > 2:
            stepData[2] = 'chrome'
          else:
            stepData.append('chrome')
        # 根据任务设置代理改写全局参数
        if proxyType:
          proxyRow = ProxyConfig.query.filter_by(id=proxyType).first()
          if browserType == 1:
            if proxyRow:
              # 复制用户上传的对应代理配置，并解压到任务目录下
              proxyZipPath = 'app/' + proxyRow.path
              taskDir = 'taskFile/' + taskRootPath
              if not os.path.exists(taskDir):
                os.makedirs(taskDir)
              if not os.path.exists(taskDir + '/ff_profile.zip'):
                zipPath = shutil.copy(proxyZipPath, taskDir + '/ff_profile.zip')
                z = zipfile.ZipFile(zipPath, 'r')
                z.extractall(taskDir+'/ff_profile')
                z.close()
              if 'win32' in sys.platform:
                taskDir = 'taskFile\\\\' + taskRootPath
                appRootPath = app.root_path.replace('\\','\\\\')
                appRootPath = appRootPath[:-3]
                proxyData = appRootPath + taskDir + '\\\\ff_profile'
              else:
                proxyData = app.root_path[:-3] + '/' + taskDir + '/ff_profile'
              proxySetting = ['${FF_PROFILE}=','Set Variable', proxyData]
              if len(stepData) > 3:
                stepData[3] = 'ff_profile_dir=${FF_PROFILE}'
              else:
                stepData.append('ff_profile_dir=${FF_PROFILE}')
              caseSteps.append({
                'values': proxySetting
              })
          if browserType == 2:
            if proxyRow:
              proxyData = {'proxy': {'proxyType': 'MANUAL', 'httpProxy': proxyRow.path, 'sslProxy': proxyRow.path}}
              proxySetting = ['${desired capabilities}=', 'Evaluate', json.dumps(proxyData)]
              if len(stepData) > 3:
                stepData[3] = 'desired_capabilities=${desired capabilities}'
              else:
                stepData.append('desired_capabilities=${desired capabilities}')
              caseSteps.append({
                'values': proxySetting
              })
      caseSteps.append({
        'values': stepData
      })
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
  testSuiteIds = Tree.query.filter(db.and_(Tree.id.in_(caseIds))).with_entities(Tree.pid).distinct().all()
  for suiteIdTuplte in testSuiteIds:
    suiteId = suiteIdTuplte[0]
    suiteData = Tree.query.filter_by(id=suiteId).first()
    test_cases = []
    for caseData in caseDatas:
      if caseData['suiteId'] == suiteId:
        test_cases.append(caseData)
    suiteConfig = CaseProjectSetting.query.filter_by(pid=suiteId).first()
    suiteLibDatas = CaseLibs.query.filter(db.and_(CaseLibs.id.in_(json.loads(suiteConfig.libs)))).all()
    suitelibs = []
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
        fileData = appRootPath + '\\\\' + valueData.key_value
      else:
        fileData = app.root_path + '/' + valueData.key_value
      globalValues.append({
        'name': valueData.key_name,
        'value': fileData,
      })
  taskInfo = {
    'project_name': projectRootData.name,
    'taskName': taskName,
    'libs': libs,
    'test_suites': test_suites,
    'browserType': browserType,
    'proxyType': proxyType,
    'taskType': taskType,
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
  keywordRootLibDatas = CaseLibs.query.filter(db.and_(CaseLibs.id.in_(json.loads(keywordRootConfig.libs)))).all()
  keywordRootlibs = []
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
  cmd = 'robot --outputdir {projectDir} {projectDir} > {projectDir}/log.txt'.format(projectDir=projectDir)
  os.system(cmd)

def GetMiddleStr(content, startStr, endStr):
  patternStr = r'%s(.+?)%s' % (startStr, endStr)
  m = re.findall(patternStr,content)
  if m:
    return m[0]

def alasyRootLog(taskInfo, projectDir, taskRootPath):
  logFile = projectDir + '/output.xml'
  DOMTree = xml.dom.minidom.parse(logFile)
  robotDom = DOMTree.documentElement
  taskLog = {
    'name': taskInfo['taskName']
  }
  testSuites = []
  for suite1 in robotDom.childNodes:
    if suite1.nodeName == 'suite':
      # 项目信息
      for suiteChild in suite1.childNodes:
        if suiteChild.nodeName == 'status':
          taskLog['startTime'] = suiteChild.getAttribute("starttime")
          taskLog['endTime'] = suiteChild.getAttribute("endtime")
        # 测试集信息
        if suiteChild.nodeName == 'suite':
          suiteInfo = {'name': suiteChild.getAttribute("name")}
          # 用例信息
          testCase = []
          for suite2 in suiteChild.childNodes:
            if suite2.nodeName == 'status':
              suiteInfo['status'] = suite2.getAttribute("status")
            if suite2.nodeName == 'test':
              case = {'name': suite2.getAttribute("name")}
              # 步骤信息
              caseSteps = []
              for test in suite2.childNodes:
                if test.nodeName == 'status':
                  case['status'] = test.getAttribute("status")
                if test.nodeName == 'kw':
                  stepInfo = {
                    'name': test.getAttribute("name"),
                    'capture': ''
                  }
                  for kw in test.childNodes:
                    if kw.nodeName == 'status':
                      stepInfo['status'] = kw.getAttribute("status")
                    if kw.nodeName == 'msg':
                      stepInfo['msg'] = kw.firstChild.data
                      stepInfo['msgLevel'] = kw.getAttribute("level")
                    if kw.nodeName == 'kw':
                      for cap in kw.childNodes:
                        if cap.nodeName == 'msg':
                          capture = cap.firstChild.data
                          capture = GetMiddleStr(capture, 'href="', '"><img')
                          if capture:
                            taskOutCapPath = app.root_path + '/static/output/' + taskRootPath
                            if not os.path.exists(taskOutCapPath):
                              os.makedirs(taskOutCapPath)
                            shutil.copy(projectDir + '/' + capture, taskOutCapPath + '/' +capture)
                            stepInfo['capture'] = 'static/output/' + taskRootPath + '/' + capture
                  caseSteps.append(stepInfo)
                case['caseSteps'] = caseSteps
              testCase.append(case)
          suiteInfo['testCase'] = testCase
          testSuites.append(suiteInfo)
      taskLog['testSuites'] = testSuites
    if suite1.nodeName == 'statistics':
      for statistics1 in suite1.childNodes:
        if statistics1.nodeName == 'total':
          for stat in statistics1.childNodes:
            if stat.nodeName == 'stat' and stat.firstChild.data == 'All Tests':
              sucessCount = int(stat.getAttribute("pass"))
              failCount = int(stat.getAttribute("fail"))
              taskLog['sucess'] = sucessCount
              taskLog['fail'] = failCount
              taskLog['total'] = failCount + sucessCount
  for suite in taskInfo['test_suites']:
    for logSuite in taskLog['testSuites']:
      if suite['name'] == logSuite['name']:
        logSuite['id'] = suite['suiteId']
        for case in suite['test_cases']:
          for logCase in logSuite['testCase']:
            if case['case_name'] == logCase['name']:
              logCase['id'] = case['caseId']
              if logCase['status'] == "FAIL":
                data = FailCaseLog(logCase['id'])
                db.session.add(data)
                db.session.commit()
  data = HomeDayExcuteCount(taskLog['total'], taskLog['fail'])
  db.session.add(data)
  db.session.commit()
  return taskLog

def saveLogToDB(taskId,logs):
  logStr = json.dumps(logs)
  data = {
    'task_log': logStr
  }
  rowData = Task.query.filter_by(id=taskId)
  rowData.update(data)
  db.session.commit()

def saveTimLogToDB(taskInfo,taskId,logs):
  if taskInfo['taskType'] == 3:
    logStr = json.dumps(logs)
    excuteDate = datetime.now().strftime('%Y-%m-%d')
    data = TimTaskLog(taskId,excuteDate,logStr)
    db.session.add(data)
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
  setTaskStatus(task_id, 2)
  try:
    now = datetime.now().strftime('%Y-%m-%d_%H_%M_%S')
    taskRootPath = encrypt_name(now)
    taskInfo = getTaskInfo(task_id,taskRootPath)
    customKeywords, keywordRootlibs = getCustomKeywords(task_id)
    projectDir = buildTaskProject(taskInfo,taskRootPath)
    buildCustomKeywordFile(projectDir,customKeywords, keywordRootlibs)
    excuteScript(projectDir)
    logs = alasyRootLog(taskInfo, projectDir, taskRootPath)
    saveLogToDB(task_id,logs)
    saveTimLogToDB(taskInfo,task_id,logs)
    setTaskStatus(task_id, 3)
    clear_project_file('taskFile/' + taskRootPath)
  except Exception as e:
    print(e)
    setTaskStatus(task_id, 4)


if __name__ == "__main__":
    manager.run()

