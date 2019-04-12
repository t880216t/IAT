#-*-coding:utf-8-*-
from xml.etree import ElementTree as et
import sys,requests,json,time,random
reload(sys)
sys.setdefaultencoding("utf8")

def addCase(projectId,name):
  data = {"id":projectId,"name":name}
  headers = {'Content-Type': 'application/json'}
  url = 'http://127.0.0.1:5000/api/IAT/addCase'
  res = requests.post(url, headers=headers, data=json.dumps(data))
  response = res.json()
  if response["code"] == 0:
    return response["content"]["id"]
  return None

def addSample(caseId,info):
  data = {
    "id": caseId,
    "info": info
  }
  headers = {'Content-Type': 'application/json'}
  url = 'http://127.0.0.1:5000/api/IAT/updateSample'
  res = requests.post(url, headers=headers, data=json.dumps(data))
  try:
    response = res.json()
    print(response["msg"])
  except Exception,e:
    print(e)
    print("数据异常：",data)

def runbuild(userId,projectId,fileName):
  root=et.parse(fileName)
  for each in root.getiterator("HTTPSamplerProxy"):
    path = ''
    method = ''
    testname = each.attrib['testname']
    params = []
    paramType = 1
    for childNode in each.getchildren():
      if childNode.tag == 'elementProp':
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
              "id":int(round(time.time() * 1000))+random.randint(1, 20),
              "key":key,
              "value":value,
              "type": False,
            })
      if childNode.attrib['name'] == 'HTTPSampler.path':
        path = childNode.text
      if childNode.attrib['name'] == 'HTTPSampler.method':
        method = childNode.text
      if childNode.attrib['name'] == 'HTTPSampler.DO_MULTIPART_POST':
        if childNode.text == 'true':
          paramType = 3
    info = {
      "asserts": {
        "assertData": [{
          "id": int(round(time.time() * 1000)),
          "value": "\"code\":0"
        }],
        "assertsType": 1
      },
      "extract": {
        "extractData": [],
        "extractType": 0
      },
      "method": method,
      "name": testname,
      "params": params,
      "paramType": paramType,
      "path": path,
      "user_id": userId,
      "preShellType": 0,
      "preShellData": "",
      "postShellType": 0,
      "postShellData": "",
    }
    caseId = addCase(projectId, testname)
    if caseId:
      addSample(caseId, info)

    # print testname
    # print method
    # print paramType
    # print path
    # print params
    # print "==============="

if "__main__" == __name__:
  # fileName = 'testData.jmx'
  # projectId = 66
  # userId = 44
  userId = sys.argv[1]
  projectId = sys.argv[2]
  fileName = sys.argv[3]
  runbuild(userId,projectId,fileName)
