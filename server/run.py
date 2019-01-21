from app import app
import subprocess

def runTimingCheck():
    subprocess.Popen('python runTimingCheck.py',shell=True)

if __name__ == '__main__':
    runTimingCheck()
    app.run(host='0.0.0.0', debug=False,threaded=True)
