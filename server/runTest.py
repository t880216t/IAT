#-*-coding:utf-8-*-
import sys,requests,os,subprocess,json, importlib
import xml.etree.ElementTree as ET
from datetime import datetime
import pandas as pd

default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
  importlib.reload(sys)
  sys.setdefaultencoding(default_encoding)

#状态设置请求
def setTaskStatus(taskId,status,msg):
  data = {'id':taskId,'status':status}
  headers = {'Content-Type':'application/json'}
  url = 'http://127.0.0.1:5000/api/IAT/updateTaskStatus'
  res = requests.post(url,headers = headers,data=json.dumps(data))
  response = res.json()
  print(response["msg"])

def updateTaskResult(taskId,result,msg):
  data = {'id':taskId,'result':json.dumps(result)}
  headers = {'Content-Type':'application/json'}
  url = 'http://127.0.0.1:5000/api/IAT/updateTaskResult'
  res = requests.post(url,headers = headers,data=json.dumps(data))
  response = res.json()
  print(response["msg"])

def read_demo(demo_path):
  tree = ET.parse(demo_path)
  return tree

def configTestElement(test_domain,params=None,proxy=None):
  domain = test_domain
  protocol = ""
  port = ""
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
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.domain"})
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.port"})
  ET.SubElement(HTTPSamplerProxy, 'stringProp', {"name": "HTTPSampler.protocol"})
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
  if data['assertData']:
    for item in data["assertData"]:
      ET.SubElement(collectionProp,'stringProp',{'name':str(item['id'])}).text = item['value']
  ET.SubElement(ResponseAssertion, 'stringProp', {"name": "Assertion.custom_message"})
  ET.SubElement(ResponseAssertion, 'stringProp', {"name": "Assertion.test_field"}).text = "Assertion.response_data"
  ET.SubElement(ResponseAssertion, 'boolProp', {"name": "Assertion.assume_success"}).text = "false"
  ET.SubElement(ResponseAssertion, 'intProp', {"name": "Assertion.test_type"}).text = "16"
  return ResponseAssertion

def JSONPathAssertion(data):
  JSONPathAssertion = ET.Element('JSONPathAssertion',{"guiclass":"JSONPathAssertionGui", "testclass":"JSONPathAssertion", "testname":"JSON断言", "enabled":"true"})
  ET.SubElement(JSONPathAssertion, 'stringProp', {"name": "JSON_PATH"}).text = "$."+data['assertData'][0]['key']
  ET.SubElement(JSONPathAssertion, 'stringProp', {"name": "EXPECTED_VALUE"}).text = data['assertData'][0]['value']
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "JSONVALIDATION"}).text = "false"
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "EXPECT_NULL"}).text = "false"
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "INVERT"}).text = "false"
  ET.SubElement(JSONPathAssertion, 'boolProp', {"name": "ISREGEX"}).text = "true"
  return JSONPathAssertion

def jSONPostProcessor(data):
  JSONPostProcessor = ET.Element('JSONPostProcessor',
                                 {"guiclass": "JSONPostProcessorGui", "testclass": "JSONPostProcessor",
                                  "testname": "JSON提取器", "enabled": "true"})
  ET.SubElement(JSONPostProcessor, 'stringProp', {"name": "JSONPostProcessor.referenceNames"}).text = data['extractData'][0]['key']
  ET.SubElement(JSONPostProcessor, 'stringProp', {"name": "JSONPostProcessor.jsonPathExprs"}).text = data['extractData'][0]['value']
  ET.SubElement(JSONPostProcessor, 'stringProp', {"name": "JSONPostProcessor.match_numbers"})
  return JSONPostProcessor

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

def set_data(tree,data):
  root = tree.getroot()
  ThreadGroup = root.find("./hashTree/hashTree/ThreadGroup")
  ThreadGroupHashTree = root.find("./hashTree/hashTree/hashTree")
  #设置项目名称
  ThreadGroup.set('testname', data["testname"])
  #设置请求headers默认参数
  HeaderManager = headerManager(data["headers"])
  #设置请求默认参数
  ConfigTestElement = configTestElement(data["domain"],data["params"],data["proxy"])
  ThreadGroupHashTree.append(HeaderManager)
  ET.SubElement(ThreadGroupHashTree,'hashTree')
  ThreadGroupHashTree.append(ConfigTestElement)
  ET.SubElement(ThreadGroupHashTree,'hashTree')
  #增加请求节点
  if data['samples']:
    for sample in data["samples"]:
      httpSamplerProxy = HTTPSamplerProxy(sample)
      ThreadGroupHashTree.append(httpSamplerProxy)
      sampleSetDown = ET.SubElement(ThreadGroupHashTree, 'hashTree')
      if sample['asserts']['assertType'] == 1:
        responseAssertion = ResponseAssertion(sample['asserts'])
      if sample['asserts']['assertType'] == 2:
        responseAssertion = JSONPathAssertion(sample['asserts'])
      sampleSetDown.append(responseAssertion)
      ET.SubElement(sampleSetDown,'hashTree')
      if sample['paramType'] ==2:
        spamleHeaderManager = headerManager([{"key":"content-type","value":"application/json;"}])
        sampleSetDown.append(spamleHeaderManager)
        ET.SubElement(sampleSetDown, 'hashTree')
      if sample['extract']['extractType'] == 1:
        JSONPostProcessor = jSONPostProcessor(sample['extract'])
        sampleSetDown.append(JSONPostProcessor)
        ET.SubElement(sampleSetDown, 'hashTree')
      if sample['preShellType'] == 1:
        BeanShellPreProcessor = beanShellPreProcessor(sample['preShellData'])
        sampleSetDown.append(BeanShellPreProcessor)
        ET.SubElement(sampleSetDown, 'hashTree')
      if sample['postShellType'] == 1:
        BeanShellPostProcessor = beanShellPostProcessor(sample['postShellData'])
        sampleSetDown.append(BeanShellPostProcessor)
  return tree

def makeResultPath(now):
  reulstPath = 'scripts/'+now
  if not os.path.exists(reulstPath):
    os.makedirs(reulstPath)
  else:
    now = datetime.now().strftime('%Y-%m-%d_%H_%M_%S')
    reulstPath = 'scripts/' + now
    os.makedirs(reulstPath)
  return reulstPath

def runJmeterTest(reulstPath):
  #cmd = "jmeter -n -t %s -l %s -e -o %s "%(reulstPath+'/testData.jmx',reulstPath+'/result.csv',reulstPath+'/resultDir')
  cmd = "jmeter -n -t %s -l %s "%(reulstPath+'/testData.jmx',reulstPath+'/result.csv')
  print(cmd)
  subprocess.call(cmd, shell=True)

def readResult(path):
  # 打开文件
  data = pd.read_table(path,sep=",")
  columns = data.columns
  values = data.values
  content = []
  for case_result in values:
    item = {}
    for index in range(len(columns)):
      item[columns[index]] = str(case_result[index])
    content.append(item)
  return content

if '__main__' == __name__:
  taskId = sys.argv[1]
  # taskId = 35
  url = 'http://127.0.0.1:5000/api/IAT/taskInfo'
  params = {"id":taskId}
  res = requests.get(url,params=params)
  response = res.json()
  if response["code"] == 0:
    try:
      setTaskStatus(taskId, 1, "get task info")
      now = datetime.now().strftime('%Y-%m-%d_%H_%M_%S')
      reulstPath = makeResultPath(now)
      tree = read_demo('templete.jmx')
      tree = set_data(tree,data=response["content"])
      tree.write(reulstPath+'/testData.jmx')
      setTaskStatus(taskId, 2, "build task script")
      runJmeterTest(reulstPath)
      setTaskStatus(taskId, 3, "excute script sucess")
      try:
        resultContent = readResult(reulstPath+'/result.csv')
        updateTaskResult(taskId,resultContent,"upload result")
      except Exception as e:
        print(e)
        setTaskStatus(taskId, 5, "task fail,please check jmeter env")
    except Exception as e:
      print (e)
      setTaskStatus(taskId, 5, "build task script fail")
  else:
    setTaskStatus(taskId,4,"get task info fail")
