#-*-coding:utf-8-*-
import time,requests,json,subprocess

def runTask():
  data = {'taskType': 2}
  headers = {'Content-Type':'application/json'}
  url = 'http://127.0.0.1:5000/api/IAT/taskList'
  res = requests.post(url,headers = headers,data=json.dumps(data))
  try:
    response = res.json()
  except:
    print "请求任务信息失败，正在重试..."
    runTask()
    time.sleep(1)
  if response["code"] == 0:
    for task in response["content"]:
        if task["status"] not in [0,4]:
            print "开始定时任务:taskId-",task["id"],"runTime-",task["runTime"]
            subprocess.Popen('python runTiming.py %s' % task["id"], shell=True)

def main():
    time.sleep(30)
    print "开始检查定时任务"
    runTask()

if "__main__" == __name__:
    main()
