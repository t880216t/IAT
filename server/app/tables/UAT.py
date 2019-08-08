from app import db
from datetime import datetime

class Project(db.Model):
  __tablename__ = 'uat_project'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)
  status = db.Column(db.SMALLINT)
  user_id = db.Column(db.Integer)

  def __init__(self,name,status,user_id):
    self.name = name
    self.status = status
    self.add_time = datetime.now()
    self.user_id = user_id

class ProjectVersion(db.Model):
  __tablename__ = 'uat_project_version'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)
  status = db.Column(db.SMALLINT)
  user_id = db.Column(db.Integer)
  project_id = db.Column(db.Integer)

  def __init__(self,name,project_id, status,user_id):
    self.name = name
    self.project_id = project_id
    self.status = status
    self.add_time = datetime.now()
    self.user_id = user_id

class Tree(db.Model):
  __tablename__ = 'uat_tree'
  id = db.Column(db.Integer, primary_key=True)
  project_id = db.Column(db.Integer)
  pid = db.Column(db.Integer)
  name = db.Column(db.String(500))
  type = db.Column(db.SMALLINT)
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  index_id = db.Column(db.Integer)

  def __init__(self,project_id,pid,name,type,user_id,index_id):
    self.project_id = project_id
    self.pid = pid
    self.name = name
    self.type = type
    self.add_time = datetime.now()
    self.user_id = user_id
    self.index_id = index_id

class CaseInfo(db.Model):
  __tablename__ = 'uat_case'
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer)
  name = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)
  update_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  type = db.Column(db.SMALLINT)
  params = db.Column(db.String(1000))
  return_values = db.Column(db.String(1000))
  set_up = db.Column(db.String(1000))
  tear_down = db.Column(db.String(1000))
  doc = db.Column(db.String(4000))

  def __init__(self,pid,name,user_id,type,params,return_values):
    self.pid = pid
    self.name = name
    self.add_time = datetime.now()
    self.update_time = datetime.now()
    self.user_id = user_id
    self.type = type
    self.params = params
    self.return_values = return_values

class CaseStep(db.Model):
  __tablename__ = 'uat_case_step'
  id = db.Column(db.Integer, primary_key=True)
  case_id = db.Column(db.Integer)
  indexId = db.Column(db.FLOAT)
  values = db.Column(db.String(4000))
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  version_id = db.Column(db.Integer)
  pid = db.Column(db.Integer)
  delete_flag = db.Column(db.SMALLINT)

  def __init__(self,case_id,indexId,values,user_id, version_id, delete_flag, pid=None):
    self.case_id = case_id
    self.indexId = indexId
    self.values = values
    self.add_time = datetime.now()
    self.user_id = user_id
    self.version_id = version_id
    self.pid = pid
    self.delete_flag = delete_flag

class CaseLibs(db.Model):
  __tablename__ = 'uat_libs'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)
  status = db.Column(db.SMALLINT)
  lib_type = db.Column(db.SMALLINT)

  def __init__(self,name,lib_type,status):
    self.name = name
    self.status = status
    self.lib_type = lib_type
    self.add_time = datetime.now()

class CaseKeywords(db.Model):
  __tablename__ = 'uat_keywords'
  id = db.Column(db.Integer, primary_key=True)
  lib_id = db.Column(db.Integer)
  word_type = db.Column(db.Integer)
  name_en = db.Column(db.String(500))
  name_zh = db.Column(db.String(500))
  shortdoc = db.Column(db.String(1000))
  doc = db.Column(db.String(4000))
  args = db.Column(db.String(1000))
  tags = db.Column(db.String(1000))
  add_time = db.Column(db.DateTime)
  update_user = db.Column(db.Integer)
  update_time = db.Column(db.DateTime)

  def __init__(self,lib_id,word_type,name_en,shortdoc,doc,args,tags):
    self.lib_id = lib_id
    self.word_type = word_type
    self.name_en = name_en
    self.shortdoc = shortdoc
    self.doc = doc
    self.args = args
    self.tags = tags
    self.add_time = datetime.now()

class CaseProjectSetting(db.Model):
  __tablename__ = 'uat_case_project_setting'
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer)
  libs = db.Column(db.String(1000))
  add_time = db.Column(db.DateTime)

  def __init__(self,pid,libs):
    self.pid = pid
    self.libs = libs
    self.add_time = datetime.now()

class Task(db.Model):
  __tablename__ = 'uat_task'
  id = db.Column(db.Integer, primary_key=True)
  task_type = db.Column(db.SMALLINT)
  name = db.Column(db.String(500))
  status = db.Column(db.SMALLINT)
  case_id = db.Column(db.String(4000))
  add_time = db.Column(db.DateTime)
  update_time = db.Column(db.DateTime)
  task_log = db.Column(db.TEXT)
  host = db.Column(db.TEXT)
  run_time = db.Column(db.String(255))
  user_id = db.Column(db.Integer)
  project_id = db.Column(db.Integer)
  value_type = db.Column(db.SMALLINT)
  browser_type = db.Column(db.SMALLINT)
  proxy_type = db.Column(db.Integer)
  version_id = db.Column(db.Integer)

  def __init__(self,name,task_type,status,case_id, run_time, user_id, project_id,value_type, browser_type, proxy_type, version_id, host):
    self.name = name
    self.task_type = task_type
    self.status = status
    self.case_id = case_id
    self.run_time = run_time
    self.user_id = user_id
    self.project_id = project_id
    self.value_type = value_type
    self.browser_type = browser_type
    self.proxy_type = proxy_type
    self.version_id = version_id
    self.host = host
    self.add_time = datetime.now()
    self.update_time = datetime.now()

class StepIndexDesc(db.Model):
  __tablename__ = 'uat_step_index_desc'
  id = db.Column(db.Integer, primary_key=True)
  step_id = db.Column(db.Integer)
  step_index = db.Column(db.Integer)
  index_type = db.Column(db.SMALLINT)
  link_id = db.Column(db.Integer)
  link_img = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)

  def __init__(self,step_id,step_index,index_type,link_id,link_img):
    self.step_id = step_id
    self.step_index = step_index
    self.index_type = index_type
    self.link_id = link_id
    self.link_img = link_img
    self.add_time = datetime.now()

class GlobalValues(db.Model):
  __tablename__ = 'uat_global_values'
  id = db.Column(db.Integer, primary_key=True)
  key_name = db.Column(db.String(500))
  key_value = db.Column(db.String(4000))
  project_id = db.Column(db.Integer)
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  value_type = db.Column(db.SMALLINT)

  def __init__(self,key_name,key_value,project_id,user_id, value_type):
    self.key_name = key_name
    self.key_value = key_value
    self.project_id = project_id
    self.user_id = user_id
    self.value_type = value_type
    self.add_time = datetime.now()

class ProxyConfig(db.Model):
  __tablename__ = 'uat_proxy'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(500))
  path = db.Column(db.String(1000))
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  browser_type = db.Column(db.SMALLINT)

  def __init__(self,name,path,user_id, browser_type):
    self.name = name
    self.path = path
    self.user_id = user_id
    self.browser_type = browser_type
    self.add_time = datetime.now()

class HomeBack(db.Model):
  __tablename__ = 'uat_homebackground'
  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(1000))
  add_time = db.Column(db.DateTime)

  def __init__(self,url):
    self.url = url
    self.add_time = datetime.now()

class TimTaskLog(db.Model):
  __tablename__ = 'uat_tim_task_log'
  id = db.Column(db.Integer, primary_key=True)
  task_id = db.Column(db.Integer)
  task_log = db.Column(db.TEXT)
  excute_date = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)

  def __init__(self,task_id, excute_date, task_log):
    self.task_id = task_id
    self.excute_date = excute_date
    self.task_log = task_log
    self.add_time = datetime.now()

class HomeDayExcuteCount(db.Model):
  __tablename__ = 'uat_home_day_excute_count'
  id = db.Column(db.Integer, primary_key=True)
  total_count = db.Column(db.Integer)
  fail_count = db.Column(db.Integer)
  add_time = db.Column(db.DateTime)

  def __init__(self, total_count, fail_count):
    self.total_count = total_count
    self.fail_count = fail_count
    self.add_time = datetime.now()

class FailCaseLog(db.Model):
  __tablename__ = 'uat_fail_case'
  id = db.Column(db.Integer, primary_key=True)
  case_id = db.Column(db.Integer)
  add_time = db.Column(db.DateTime)

  def __init__(self, case_id):
    self.case_id = case_id
    self.add_time = datetime.now()

class ProjectFile(db.Model):
  __tablename__ = 'uat_project_file'
  id = db.Column(db.Integer, primary_key=True)
  key_name = db.Column(db.String(500))
  key_value = db.Column(db.String(1000))
  file_name = db.Column(db.String(500))
  file_path = db.Column(db.String(1000))
  add_time = db.Column(db.DateTime)
  pid = db.Column(db.Integer)
  user_id = db.Column(db.Integer)

  def __init__(self, key_name, key_value, file_name, file_path, pid, user_id):
    self.key_name = key_name
    self.key_value = key_value
    self.file_name = file_name
    self.file_path = file_path
    self.pid = pid
    self.user_id = user_id
    self.add_time = datetime.now()
