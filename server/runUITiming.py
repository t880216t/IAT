#!venv/bin/python
# -*-coding:utf-8-*-
import schedule, subprocess, time
from flask_script import Manager
from app.tables.UAT import Task
from app import app,db

manager = Manager(app)

class TimScript():
  def __init__(self, taskId):
    self.taskId = taskId
    self.stop = 0

  def getTaskStatus(self,taskId):
    rowData = Task.query.filter_by(id=taskId).first()
    db.session.commit()
    if rowData:
      return rowData.status, rowData.run_time
    else:
      return None, None


  def start_job(self,taskId):
    subprocess.call("python runUITest.py runScript -i %s" % taskId, shell=True)


  def stop_job(self,taskId):
    status, runTime = self.getTaskStatus(taskId)
    if status == 4:
      self.stop = 1


  def runScript(self):
    status, runTime = self.getTaskStatus(self.taskId)
    if runTime and status:
      print("UI定时任务开始：taskId-", self.taskId, "runTime -", runTime)
      schedule.every().day.at(str(runTime)).do(self.start_job, self.taskId)
      schedule.every(10).seconds.do(self.stop_job, self.taskId)
    else:
      print("run UI timing task [%s] error" % self.taskId)

    while True:
      schedule.run_pending()
      time.sleep(1)
      if self.stop == 1:
        print("定时时任务关闭：taskId-", self.taskId, )
        break

@manager.option('-i', '--task_id', dest='task_id', default='')
def runScript(task_id):
  mainScript = TimScript(task_id)
  mainScript.runScript()


if __name__ == "__main__":
  manager.run()
