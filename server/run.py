from app import app,socketio
import subprocess

def runTimingCheck():
    subprocess.Popen('python runTimingCheck.py main',shell=True)

if __name__ == '__main__':
  runTimingCheck()
  socketio.run(app,host='0.0.0.0',port=5001, debug=True, use_reloader=False)
