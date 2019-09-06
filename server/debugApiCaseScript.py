#!venv/bin/python
#-*-coding:utf-8-*-
import sys,time,os,subprocess,json, importlib, binascii, hashlib, shutil
import xml.etree.ElementTree as ET
from flask_script import Manager
from app.tables.IAT import Project, Tree, Sample, Task, iatShellData, GlobalValues, iatCaseInfo, iatKeyValues
from app import app,db
from datetime import datetime
import pandas as pd

default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
  importlib.reload(sys)
  sys.setdefaultencoding(default_encoding)

manager = Manager(app)

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

def encrypt_name(name, salt=None, encryptlop=30):
  if not salt:
    salt = binascii.hexlify(os.urandom(32)).decode()
  for i in range(encryptlop):
    name = hashlib.sha1(str(name + salt).encode('utf-8')).hexdigest()
  return name

#状态设置请求
def setTaskStatus(taskId,status, msg):
  data = {
    'status': status
  }
  rowData = Task.query.filter_by(id=taskId)
  rowData.update(data)
  db.session.commit()
  print(msg)

def updateTaskResult(taskId,result,msg):
  data = {
    'result': json.dumps(result)
  }
  rowData = Task.query.filter_by(id=taskId)
  rowData.update(data)
  db.session.commit()
  print(msg)

def read_demo(demo_path):
  tree = ET.parse(demo_path)
  return tree

def configTestElement(test_domain,params=None,proxy=None):
  domain = test_domain
  protocol = ""
  port = ""
  if domain:
    if "://" in test_domain:
      protocol = test_domain.split("://")[0]
      domain = test_domain.split("://")[1]
      if ":" in domain:
        domain = domain.split(":")[0]
    formatTestDomain = test_domain.replace("://","")
    if ":" in formatTestDomain:
      port = formatTestDomain.split(":")[1]
  ConfigTestElement = ET.Element("ConfigTestElement",{
    "guiclass":"HttpDefaultsGui",
    "testclass":"ConfigTestElement",
    "testname":u"HTTP请求默认值",
    "enabled":"true",
  })
  elementProp = ET.SubElement(ConfigTestElement,"elementProp", {"name": "HTTPsampler.Arguments", "elementType": "Arguments",
                                           "guiclass": "HTTPArgumentsPanel", "testclass": "Arguments",
                                           "testname": u"用户定义的变量", "enabled": "true"})
  collectionProp = ET.SubElement(elementProp,'collectionProp',{"name":"Arguments.arguments"})
  # if projectGlobalValues:
  #   for item in projectGlobalValues:
  #     if item:
  #       paramElementProp = ET.Element('elementProp',{"name":item["key"], "elementType":"HTTPArgument"})
  #       ET.SubElement(paramElementProp,'boolProp',{"name":"HTTPArgument.always_encode"}).text = 'false'
  #       ET.SubElement(paramElementProp,'stringProp',{"name":"Argument.value"}).text = item["value"]
  #       ET.SubElement(paramElementProp,'stringProp',{"name":"Argument.metadata"}).text = '='
  #       ET.SubElement(paramElementProp,'boolProp',{"name":"HTTPArgument.use_equals"}).text = 'true'
  #       ET.SubElement(paramElementProp,'stringProp',{"name":"Argument.name"}).text = item["key"]
  #       collectionProp.append(paramElementProp)

  if params:
    for item in params:
      if item:
        paramElementProp = ET.Element('elementProp',{"name":item["key"], "elementType":"HTTPArgument"})
        ET.SubElement(paramElementProp,'boolProp',{"name":"HTTPArgument.always_encode"}).text = 'false'
        ET.SubElement(paramElementProp,'stringProp',{"name":"Argument.value"}).text = item["value"]
        ET.SubElement(paramElementProp,'stringProp',{"name":"Argument.metadata"}).text = '='
        ET.SubElement(paramElementProp,'boolProp',{"name":"HTTPArgument.use_equals"}).text = 'true'
        ET.SubElement(paramElementProp,'stringProp',{"name":"Argument.name"}).text = item["key"]
        collectionProp.append(paramElementProp)

  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.domain"}).text = domain
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.port"}).text = port
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.protocol"}).text = protocol
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.contentEncoding"})
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.path"})
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.concurrentPool"}).text = "6"
  if proxy:
    try:
      userName = ''
      password = ''
      server = ''
      port = ''
      if "@" in proxy:
        userConfig = proxy.split('@')[0]
        proxyConfig = proxy.split('@')[1]
        userName = userConfig.split(':')[0]
        password = userConfig.split(':')[1]
        server = proxyConfig.split(':')[0]
        port = proxyConfig.split(':')[1]
      elif ":" in proxy:
        server = proxy.split(':')[0]
        port = proxy.split(':')[1]
      ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.proxyHost"}).text = server
      ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.proxyPort"}).text = port
      ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.proxyUser"}).text = userName
      ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.proxyPass"}).text = password
    except Exception as e:
      print("proxy error",e)
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.connect_timeout"})
  ET.SubElement(ConfigTestElement, 'stringProp', {"name": "HTTPSampler.response_timeout"})
  return ConfigTestElement

def UserParametersSet(globalValueDatas=None):
  UserParameters = ET.Element("UserParameters",{
    "guiclass":"UserParametersGui",
    "testclass":"UserParameters",
    "testname":u"用户参数",
    "enabled":"true",
  })
  if globalValueDatas:
    keyCollectionProp = ET.SubElement(UserParameters, 'collectionProp', {"name": "UserParameters.names"})
    valueCollectionProp = ET.SubElement(UserParameters, 'collectionProp', {"name": "UserParameters.thread_values"})
    collectionProp = ET.SubElement(valueCollectionProp, 'collectionProp', {"name": str(round(time.time()))})
    for item in globalValueDatas:
      ET.SubElement(keyCollectionProp, 'stringProp', {"name": str(round(time.time()))}).text = item["key"]
      ET.SubElement(collectionProp, 'stringProp', {"name": str(round(time.time()))}).text = item["value"]

  return UserParameters

def headerManager(headers=None):
  HeaderManager = ET.Element("HeaderManager",{
    "guiclass":"HeaderPanel",
    "testclass":"HeaderManager",
    "testname":u"HTTP信息头管理器",
    "enabled":"true",
  })
  collectionProp = ET.SubElement(HeaderManager,'collectionProp',{"name":"HeaderManager.headers"})
  if headers:
    for item in headers:
      if item:
        paramElementProp = ET.Element('elementProp',{"name":"", "elementType":"Header"})
        ET.SubElement(paramElementProp,'stringProp',{"name":"Header.name"}).text = item["key"]
        ET.SubElement(paramElementProp,'stringProp',{"name":"Header.value"}).text = item["value"]
        collectionProp.append(paramElementProp)
  return HeaderManager

def HTTPSamplerProxy(sample):
  test_domain = sample['domain']
  domain = test_domain
  protocol = ""
  port = ""
  if test_domain:
    if "://" in test_domain:
      protocol = test_domain.split("://")[0]
      domain = test_domain.split("://")[1]
      if ":" in domain:
        domain = domain.split(":")[0]
    formatTestDomain = test_domain.replace("://", "")
    if ":" in formatTestDomain:
      port = formatTestDomain.split(":")[1]

  HTTPSamplerProxy = ET.Element('HTTPSamplerProxy',{"guiclass":"HttpTestSampleGui", "testclass":"HTTPSamplerProxy", "testname":sample['name'], "enabled":"true"})
  elementProp = ET.SubElement(HTTPSamplerProxy,"elementProp",{"name": "HTTPsampler.Arguments", "elementType": "Arguments",
                                           "guiclass": "HTTPArgumentsPanel", "testclass": "Arguments",
                                           "testname": "用户定义的变量", "enabled": "true"})
  collectionProp = ET.SubElement(elementProp, 'collectionProp', {"name": "Arguments.arguments"})
  if sample['params']:
    if sample['paramType'] ==2:
      formParams = {}
      for item in sample['params']:
        if item:
          formParams[item["key"]] = item["value"]
      paramElementProp = ET.Element('elementProp', {"name": "", "elementType": "HTTPArgument"})
      ET.SubElement(paramElementProp, 'boolProp', {"name": "HTTPArgument.always_encode"}).text = 'false'
      ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.value"}).text = json.dumps(formParams)
      ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.metadata"}).text = '='
      collectionProp.append(paramElementProp)
    elif sample['paramType'] == 4:
      paramElementProp = ET.Element('elementProp', {"name": "", "elementType": "HTTPArgument"})
      ET.SubElement(paramElementProp, 'boolProp', {"name": "HTTPArgument.always_encode"}).text = 'false'
      ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.value"}).text = sample['params'][0]['value']
      ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.metadata"}).text = '='
      collectionProp.append(paramElementProp)
    else:
      for item in sample['params']:
        if item:
          paramElementProp = ET.Element('elementProp', {"name": item["key"], "elementType": "HTTPArgument"})
          ET.SubElement(paramElementProp, 'boolProp', {"name": "HTTPArgument.always_encode"}).text = 'false'
          ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.value"}).text = item["value"]
          ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.metadata"}).text = '='
          ET.SubElement(paramElementProp, 'boolProp', {"name": "HTTPArgument.use_equals"}).text = 'true'
          ET.SubElement(paramElementProp, 'stringProp', {"name": "Argument.name"}).text = item["key"]
          collectionProp.append(paramElementProp)

  DO_MULTIPART_POST = "false"
  if sample['paramType'] ==3:
    DO_MULTIPART_POST = "true"
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.domain"}).text = domain
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.port"}).text = port
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.protocol"}).text = protocol
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.contentEncoding"})
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.path"}).text = sample['path']
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.method"}).text = sample['method']
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.follow_redirects"}).text = "false"
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.auto_redirects"}).text = "false"
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.use_keepalive"}).text = "true"
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.DO_MULTIPART_POST"}).text = DO_MULTIPART_POST
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.embedded_url_re"})
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.connect_timeout"})
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name":"HTTPSampler.response_timeout"})
  return HTTPSamplerProxy

def ResponseAssertion(data):
  ResponseAssertion = ET.Element('ResponseAssertion',{"guiclass":"AssertionGui", "testclass":"ResponseAssertion", "testname":"响应断言", "enabled":"true"})
  collectionProp = ET.SubElement(ResponseAssertion, 'collectionProp', {"name": "Asserion.test_strings"})
  if data:
    for item in data:
      ET.SubElement(collectionProp,'stringProp',{'name':str(round(time.time()))}).text = item['value']
  ET.SubElement(ResponseAssertion, 'stringProp', {"name": "Assertion.custom_message"})
  ET.SubElement(ResponseAssertion, 'stringProp', {"name": "Assertion.test_field"}).text = "Assertion.response_data"
  ET.SubElement(ResponseAssertion, 'boolProp', {"name": "Assertion.assume_success"}).text = "false"
  ET.SubElement(ResponseAssertion, 'intProp', {"name": "Assertion.test_type"}).text = "16"
  return ResponseAssertion

def JSONPathAssertion(data):
  JSONPathAssertion = ET.Element('JSONPathAssertion',{"guiclass":"JSONPathAssertionGui", "testclass":"JSONPathAssertion", "testname":"JSON断言", "enabled":"true"})
  ET.SubElement(JSONPathAssertion, 'stringProp', {"name": "JSON_PATH"}).text = "$."+data['key']
  ET.SubElement(JSONPathAssertion, 'stringProp', {"name": "EXPECTED_VALUE"}).text = data['value']
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "JSONVALIDATION"}).text = "true"
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "EXPECT_NULL"}).text = "false"
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "INVERT"}).text = "false"
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "ISREGEX"}).text = "true"
  return JSONPathAssertion

def jSONPostProcessor(data):
  JSONPostProcessor = ET.Element('JSONPostProcessor',
                                 {"guiclass": "JSONPostProcessorGui", "testclass": "JSONPostProcessor",
                                  "testname": "JSON提取器", "enabled": "true"})
  ET.SubElement(JSONPostProcessor, 'stringProp', {"name": "JSONPostProcessor.referenceNames"}).text = data['key']
  ET.SubElement(JSONPostProcessor, 'stringProp', {"name": "JSONPostProcessor.jsonPathExprs"}).text = data['value']
  ET.SubElement(JSONPostProcessor, 'stringProp', {"name": "JSONPostProcessor.match_numbers"})
  return JSONPostProcessor

def regexExtractor(data):
  RegexExtractor = ET.Element('RegexExtractor',
                                 {"guiclass": "RegexExtractorGui", "testclass": "RegexExtractor",
                                  "testname": "正则表达式提取器", "enabled": "true"})
  ET.SubElement(RegexExtractor, 'stringProp', {"name": "RegexExtractor.useHeaders"}).text = "false"
  ET.SubElement(RegexExtractor, 'stringProp', {"name": "RegexExtractor.refname"}).text = data['key']
  ET.SubElement(RegexExtractor, 'stringProp', {"name": "RegexExtractor.regex"}).text = data['value']
  ET.SubElement(RegexExtractor, 'stringProp', {"name": "RegexExtractor.template"}).text = "$1$"
  ET.SubElement(RegexExtractor, 'stringProp', {"name": "RegexExtractor.default"})
  ET.SubElement(RegexExtractor, 'stringProp', {"name": "RegexExtractor.match_number"}).text = "1"
  return RegexExtractor

def resultSaver(reulstPath,index):
  ResultSaver = ET.Element('ResultSaver',
                                 {"guiclass": "ResultSaverGui", "testclass": "ResultSaver",
                                  "testname": "保存响应到文件", "enabled": "true"})
  ET.SubElement(ResultSaver, 'stringProp', {"name": "FileSaver.filename"}).text = reulstPath+'/response'+str(index)+'.txt'
  ET.SubElement(ResultSaver, 'boolProp', {"name": "FileSaver.errorsonly"}).text = "false"
  ET.SubElement(ResultSaver, 'boolProp', {"name": "FileSaver.successonly"}).text = "false"
  ET.SubElement(ResultSaver, 'boolProp', {"name": "FileSaver.skipsuffix"}).text = "true"
  ET.SubElement(ResultSaver, 'boolProp', {"name": "FileSaver.skipautonumber"}).text = "true"
  return ResultSaver

def beanShellPreProcessor(data):
  BeanShellPreProcessor = ET.Element('BeanShellPreProcessor',{"guiclass": "TestBeanGUI", "testclass": "BeanShellPreProcessor",
                                  "testname": "BeanShell PreProcessor", "enabled": "true"})
  ET.SubElement(BeanShellPreProcessor, 'stringProp', {"name": "filename"})
  ET.SubElement(BeanShellPreProcessor, 'stringProp', {"name": "parameters"})
  ET.SubElement(BeanShellPreProcessor, 'boolProp', {"name": "resetInterpreter"}).text = "false"
  ET.SubElement(BeanShellPreProcessor, 'stringProp', {"name": "script"}).text = data
  return BeanShellPreProcessor

def beanShellPostProcessor(data):
  BeanShellPostProcessor = ET.Element('BeanShellPostProcessor',{"guiclass": "TestBeanGUI", "testclass": "BeanShellPostProcessor",
                                  "testname": "BeanShell PostProcessor", "enabled": "true"})
  ET.SubElement(BeanShellPostProcessor, 'stringProp', {"name": "filename"})
  ET.SubElement(BeanShellPostProcessor, 'stringProp', {"name": "parameters"})
  ET.SubElement(BeanShellPostProcessor, 'boolProp', {"name": "resetInterpreter"}).text = "false"
  ET.SubElement(BeanShellPostProcessor, 'stringProp', {"name": "script"}).text = data
  return BeanShellPostProcessor

def getGlobalValues(projectId, valueType):
  rowDatas = GlobalValues.query.filter(db.and_(GlobalValues.project_id == projectId,GlobalValues.value_type == valueType)).all()
  content = []
  if rowDatas:
    for rowData in rowDatas:
      content.append({
        'key': rowData.key_name,
        'value': rowData.key_value,
      })
  return content

def set_data(tree,data, isDebug=False, taskRootDir=None):
  root = tree.getroot()
  ThreadGroup = root.find("./hashTree/hashTree/ThreadGroup")
  ThreadGroupHashTree = root.find("./hashTree/hashTree/hashTree")
  # 设置项目名称
  ThreadGroup.set('testname', data["testname"])

  # 全局参数设置
  if data["globalValues"]:
    UserParameters = UserParametersSet(data["globalValues"])
    ThreadGroupHashTree.append(UserParameters)
    ET.SubElement(ThreadGroupHashTree, 'hashTree')

  # 设置请求headers默认参数
  HeaderManager = headerManager(data["headers"])
  ThreadGroupHashTree.append(HeaderManager)
  ET.SubElement(ThreadGroupHashTree,'hashTree')

  # 设置请求默认参数
  ConfigTestElement = configTestElement(data["domain"],data["params"],data["proxy"])
  ThreadGroupHashTree.append(ConfigTestElement)
  ET.SubElement(ThreadGroupHashTree,'hashTree')

  # 增加请求节点
  if data['samples']:
    for index,sample in enumerate(data["samples"]):
      # 参数设置
      httpSamplerProxy = HTTPSamplerProxy(sample)
      ThreadGroupHashTree.append(httpSamplerProxy)
      sampleSetDown = ET.SubElement(ThreadGroupHashTree, 'hashTree')

      # 设置用例headers
      HeaderManager = headerManager(sample["headers"])
      sampleSetDown.append(HeaderManager)
      ET.SubElement(sampleSetDown, 'hashTree')

      if sample['assertType'] == 1:
        responseAssertion = ResponseAssertion(sample['asserts'])
        sampleSetDown.append(responseAssertion)
        ET.SubElement(sampleSetDown, 'hashTree')
      if sample['assertType'] == 2:
        for jsonAssert in sample['asserts']:
          responseAssertion = JSONPathAssertion(jsonAssert)
          sampleSetDown.append(responseAssertion)
          ET.SubElement(sampleSetDown,'hashTree')

      if sample['preShellData']:
        BeanShellPreProcessor = beanShellPreProcessor(sample['preShellData'])
        sampleSetDown.append(BeanShellPreProcessor)
        ET.SubElement(sampleSetDown, 'hashTree')

      if sample['postShellData']:
        BeanShellPostProcessor = beanShellPostProcessor(sample['postShellData'])
        sampleSetDown.append(BeanShellPostProcessor)
        ET.SubElement(sampleSetDown, 'hashTree')

      if sample['extractType'] == 1:
        for jsonExtract in sample['extracts']:
          JSONPostProcessor = jSONPostProcessor(jsonExtract)
          sampleSetDown.append(JSONPostProcessor)
          ET.SubElement(sampleSetDown, 'hashTree')

      if sample['extractType'] == 2:
        for jsonExtract in sample['extracts']:
          RegexExtractor = regexExtractor(jsonExtract)
          sampleSetDown.append(RegexExtractor)
          ET.SubElement(sampleSetDown, 'hashTree')

      # 保存数据
      if isDebug:
        ResultSaver = resultSaver(taskRootDir,index)
        sampleSetDown.append(ResultSaver)
        ET.SubElement(sampleSetDown, 'hashTree')

  return tree

def makeResultPath(taskRootPath):
  taskDir = 'taskFile/' + taskRootPath
  if not os.path.exists(taskDir):
    os.makedirs(taskDir)
  return taskDir

def runJmeterTest(reulstPath):
  # jmeter可以自己改位置
  cmd = "jmeter -n -t %s -l %s "%(reulstPath+'/testData.jmx',reulstPath+'/result.csv')
  print(cmd)
  subprocess.call(cmd, shell=True)

def readResult(path, isDebug=False):
  # 打开文件
  data = pd.read_table(path+'/result.csv',sep=",")
  columns = data.columns
  values = data.values
  content = []
  for valueIndex,case_result in enumerate(values):
    item = {}
    for index in range(len(columns)):
      item[columns[index]] = str(case_result[index])
    if isDebug:
      if os.path.isfile(path + '/response'+str(valueIndex)+'.txt'):
        with open(path + '/response'+str(valueIndex)+'.txt', 'r', encoding='UTF-8') as f:
          item['response'] = f.read()
    content.append(item)

  return content

def getTaskInfo(taskId):
  taskData = Task.query.filter(db.and_(Task.id == taskId, )).first()
  taskInfo = {}
  if taskData:
    # 获取项目全局参数
    projectGlobalValues = getGlobalValues(taskData.project_id, taskData.value_type)
    taskParams = json.loads(taskData.params)
    caseIds = json.loads(taskData.case)
    samples = []
    for caseId in caseIds:
      caseData = iatCaseInfo.query.filter_by(pid=caseId).first()
      if caseData:
        sampleName = Tree.query.filter_by(id=caseId).first().name

        # 请求header
        headers = []
        headerDatas = iatKeyValues.query.filter(db.and_(iatKeyValues.value_type == 1, iatKeyValues.pid == caseId)).all()
        if headerDatas:
          for headerData in headerDatas:
            headers.append({
              'key': headerData.key_name,
              'value': headerData.key_value,
            })
        if caseData.param_type in [2, 4]:
          headers.append({"key":"content-type","value":"application/json;"})

        # 参数
        params = []
        if caseData.param_type == 4:
          paramData = iatCaseInfo.query.filter_by(pid=caseId).first()
          if paramData:
            params.append({
              'value': paramData.body_data,
            })
        else:
          paramDatas = iatKeyValues.query.filter(
            db.and_(iatKeyValues.value_type == 2, iatKeyValues.pid == caseId)).all()
          if paramDatas:
            for paramData in paramDatas:
              params.append({
                'key': paramData.key_name,
                'value': paramData.key_value,
              })

        # 校验值
        asserts = []
        if caseData.assert_type == 1:
          assertDatas = iatKeyValues.query.filter(
            db.and_(iatKeyValues.value_type == 3, iatKeyValues.pid == caseId)).all()
          if assertDatas:
            for assertData in assertDatas:
              asserts.append({
                'value': assertData.key_value,
              })
        else:
          assertDatas = iatKeyValues.query.filter(
            db.and_(iatKeyValues.value_type == 4, iatKeyValues.pid == caseId)).all()
          if assertDatas:
            for assertData in assertDatas:
              asserts.append({
                'key': assertData.key_name,
                'value': assertData.key_value,
              })

        # 参数化提取
        extracts = []
        if caseData.extract_type != 0:
          extractDatas = GlobalValues.query.filter(
            db.and_(GlobalValues.value_type == 3, GlobalValues.case_id == caseId)).all()
          if extractDatas:
            for extractData in extractDatas:
              extracts.append({
                'key': extractData.key_name,
                'value': extractData.key_value,
              })

        # 前置shell
        preShellData = ''
        postShellData = ''
        shellDatas = iatShellData.query.filter_by(pid= caseId).all()
        if shellDatas:
          for shellData in shellDatas:
            if shellData.shell_type == 1:
              preShellData = shellData.shell_data
            if shellData.shell_type == 2:
              postShellData = shellData.shell_data

        samples.append({
          "id": caseData.id,
          "name": sampleName,
          "path": caseData.path,
          "domain": caseData.domain,
          "method": caseData.method,
          "headers": headers,
          "paramType": caseData.param_type,
          "assertType": caseData.assert_type,
          "extractType": caseData.extract_type,
          "params": params,
          "asserts": asserts,
          "extracts": extracts,
          "preShellData": preShellData,
          "postShellData": postShellData,
        })
    taskInfo = {
      "testname": taskData.name,
      "domain": taskData.domain,
      "proxy": taskData.proxy,
      "valueType": taskData.value_type,
      "project": taskData.project_id,
      "params": taskParams,
      "samples": samples,
      "headers": '',
      "globalValues": projectGlobalValues,
    }

  return taskInfo

@manager.option('-i','--task_id',dest='task_id',default='')
def runScript(task_id):
  try:
    taskInfo = getTaskInfo(task_id)
    setTaskStatus(task_id, 1, "get task info")
    now = datetime.now().strftime('%Y-%m-%d_%H_%M_%S')
    taskRootPath = encrypt_name(now)
    reulstPath = makeResultPath(taskRootPath)
    tree = read_demo('templete.jmx')
    tree = set_data(tree, data=taskInfo, isDebug=True, taskRootDir=reulstPath)
    tree.write(reulstPath + '/testData.jmx')
    setTaskStatus(task_id, 2, "build task script")
    runJmeterTest(reulstPath)
    setTaskStatus(task_id, 3, "excute script sucess")
    try:
      resultContent = readResult(reulstPath, isDebug=True)
      updateTaskResult(task_id, resultContent, "upload result")
      clear_project_file('taskFile/' + taskRootPath)
    except Exception as e:
      print(e)
      setTaskStatus(task_id, 5, "task fail,please check jmeter env")
  except Exception as e:
    print(e)
    setTaskStatus(task_id, 4, "build task script fail")


if '__main__' == __name__:
  manager.run()
