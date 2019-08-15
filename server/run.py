from app import app,socketio
import subprocess

def runTimingCheck():
    subprocess.Popen('python runTimingCheck.py main',shell=True)

if __name__ == '__main__':
  runTimingCheck()
  socketio.run(app, debug=False, use_reloader=False)