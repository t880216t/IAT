#-*-coding:utf-8-*-
import schedule,subprocess
import time,requests,json,sys

def getTaskStatus(taskId):
  data = {'id': taskId}
  url = 'http://127.0.0.1:5000/api/IAT/getTaskStatus'
  res = requests.get(url, data=data)
  response = res.json()
  if response["code"] == 0:
    return response["content"]["status"],response["content"]["runTime"]
  return None,None

def start_job(taskId):
    subprocess.call("python runTest.py %s "%taskId,shell=True)

def stop_job(taskId):
    status,runTime = getTaskStatus(taskId)
    if status == 4:
      global stop
      stop = 1

if "__main__" == __name__:
  taskId = sys.argv[1]
  # taskId = 23
  stop = 0
  status, runTime = getTaskStatus(taskId)
  print "定时时任务开始：taskId-",taskId,  "runTime -",runTime
  schedule.every().day.at(runTime).do(start_job, taskId)
  schedule.every(10).seconds.do(stop_job,taskId)

  while True:
      schedule.run_pending()
      time.sleep(1)
      if stop == 1:
        print "定时时任务关闭：taskId-", taskId,
        break

