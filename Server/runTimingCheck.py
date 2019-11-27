#!venv/bin/python
#-*-coding:utf-8-*-
import time,json,subprocess
from flask_script import Manager
from app.tables.IAT import Task as IATTask
from app import app,db

manager = Manager(app)

def runTimTask():
  iatTimTaskDatas = IATTask.query.filter(db.and_(IATTask.status.notin_([0,4]),IATTask.task_type == 2)).all()
  for timTask in iatTimTaskDatas:
    subprocess.Popen('python runTiming.py runScript -i %s' % timTask.id, shell=True)

@manager.command
def main():
  runTimTask()

if __name__ == '__main__':
    manager.run()
