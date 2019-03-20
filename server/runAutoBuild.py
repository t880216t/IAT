#-*-coding:utf-8-*-
__author__="orion-c"

import json,os,requests,time,sys

def loadFileData(fileName):
    data = open(fileName).read()
    data = json.loads(data)
    return data

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

def getPath(url):
  if '?' in url:
    url = url[0:url.rfind('?', 1)]
  url = url.split('/')
  path = ''
  for index,p in enumerate(url):
    if index>2:
      path += ("/"+p)
  return path

def runBuild(userId,projectId,request_data):
  for index,item in enumerate(request_data):
    method = item['request']['method']
    url = item['request']['url']
    path = getPath(url)
    if method == 'POST':
      try:
        params = item['request']['postData']['params']
      except:
        params = item['request']['queryString']
    if method == 'GET':
      params = item['request']['queryString']
    name = path.replace("/","_")
    new_params = []
    paramType = 1
    for param in params:
      new_params.append({
        "id":int(round(time.time() * 1000)),
        "key":param["name"],
        "value":param["value"],
        "type": False,
      })
    for header in item['request']['headers']:
      if "application/json" in header["value"]:
        paramType = 2
      elif "multipart/form-data" in header["value"]:
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
      "name": name,
      "params": new_params,
      "paramType": paramType,
      "path": path,
      "user_id": userId
    }
    caseId = addCase(projectId,name)
    if caseId:
      addSample(caseId, info)

if "__main__"==__name__:
  # fileName = 'test.har'
  # projectId = 66
  userId = sys.argv[1]
  projectId = sys.argv[2]
  fileName = sys.argv[3]
  all_data = loadFileData(fileName)
  request_data = all_data['log']['entries']
  runBuild(userId,projectId,request_data)
