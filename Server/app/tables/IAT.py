from app import db
from datetime import datetime

class Project(db.Model):
  __tablename__ = 'project'
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

class TaskCount(db.Model):
  __tablename__ = 'task_count'
  id = db.Column(db.Integer, primary_key=True)
  task_total = db.Column(db.Integer)
  sucess = db.Column(db.Integer)
  fail = db.Column(db.Integer)
  add_time = db.Column(db.DateTime)

  def __init__(self,task_total,sucess,fail):
    self.task_total = task_total
    self.sucess = sucess
    self.add_time = datetime.now()
    self.fail = fail

class Tree(db.Model):
  __tablename__ = 'tree'
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

class Sample(db.Model):
  __tablename__ = 'sample'
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer)
  path = db.Column(db.String(500))
  method = db.Column(db.String(255))
  params = db.Column(db.TEXT)
  param_type = db.Column(db.SMALLINT)
  asserts_type = db.Column(db.SMALLINT)
  extract_type = db.Column(db.SMALLINT)
  extract_key_name = db.Column(db.String(500))
  asserts_data = db.Column(db.String(500))
  extract_data = db.Column(db.String(500))
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  project_id = db.Column(db.Integer)
  pre_shell_type = db.Column(db.SMALLINT)
  pre_shell_data = db.Column(db.TEXT)
  post_shell_type = db.Column(db.SMALLINT)
  post_shell_data = db.Column(db.TEXT)

  def __init__(self,pid,path,method,param_type,params,asserts_type,asserts_data,extract_type,extract_key_name,extract_data,user_id,project_id,pre_shell_type,pre_shell_data,post_shell_type,post_shell_data):
    self.pid = pid
    self.path = path
    self.method = method
    self.param_type = param_type
    self.params = params
    self.asserts_type = asserts_type
    self.extract_type = extract_type
    self.asserts_data = asserts_data
    self.extract_key_name = extract_key_name
    self.extract_data = extract_data
    self.add_time = datetime.now()
    self.user_id = user_id
    self.project_id = project_id
    self.pre_shell_type = pre_shell_type
    self.pre_shell_data = pre_shell_data
    self.post_shell_type = post_shell_type
    self.post_shell_data = post_shell_data

class Task(db.Model):
  __tablename__ = 'task'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(500))
  domain = db.Column(db.String(500))
  task_type = db.Column(db.SMALLINT)
  value_type = db.Column(db.SMALLINT)
  status = db.Column(db.SMALLINT)
  run_time = db.Column(db.String(255))
  task_desc = db.Column(db.String(1000))
  headers = db.Column(db.TEXT)
  params = db.Column(db.TEXT)
  proxy = db.Column(db.String(500))
  case = db.Column(db.TEXT)
  result = db.Column(db.TEXT)
  daily_result = db.Column(db.TEXT)
  user_id = db.Column(db.Integer)
  project_id = db.Column(db.Integer)
  add_time = db.Column(db.DateTime)
  update_time = db.Column(db.DateTime)

  def __init__(self,name,task_desc,project_id,task_type,run_time,domain,headers,params,proxy,case,user_id,status,value_type):
    self.name = name
    self.task_desc = task_desc
    self.project_id = project_id
    self.task_type = task_type
    self.value_type = value_type
    self.run_time = run_time
    self.domain = domain
    self.headers = headers
    self.params = params
    self.proxy = proxy
    self.case = case
    self.add_time = datetime.now()
    self.update_time = datetime.now()
    self.user_id = user_id
    self.status = status

class GlobalValues(db.Model):
  __tablename__ = 'global_values'
  id = db.Column(db.Integer, primary_key=True)
  key_name = db.Column(db.String(500))
  key_value = db.Column(db.String(4000))
  project_id = db.Column(db.Integer)
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  case_id = db.Column(db.Integer)
  value_type = db.Column(db.SMALLINT)

  def __init__(self,key_name,key_value,project_id,user_id, value_type, case_id):
    self.key_name = key_name
    self.key_value = key_value
    self.project_id = project_id
    self.user_id = user_id
    self.value_type = value_type
    self.case_id = case_id
    self.add_time = datetime.now()

class iatKeyValues(db.Model):
  __tablename__ = 'iat_key_values'
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer)
  key_name = db.Column(db.String(500))
  key_value = db.Column(db.String(2000))
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)
  value_type = db.Column(db.SMALLINT)

  def __init__(self,key_name,key_value,pid,user_id, value_type):
    self.key_name = key_name
    self.key_value = key_value
    self.pid = pid
    self.user_id = user_id
    self.value_type = value_type
    self.add_time = datetime.now()

class iatShellData(db.Model):
  __tablename__ = 'iat_shell_data'
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer)
  shell_type = db.Column(db.SMALLINT)
  shell_data = db.Column(db.TEXT)
  add_time = db.Column(db.DateTime)

  def __init__(self,pid,shell_type,shell_data):
    self.pid = pid
    self.shell_type = shell_type
    self.shell_data = shell_data
    self.add_time = datetime.now()

class iatCaseInfo(db.Model):
  __tablename__ = 'iat_case_info'
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer)
  domain = db.Column(db.String(500))
  method = db.Column(db.String(500))
  path = db.Column(db.String(500))
  body_data = db.Column(db.String(4000))
  param_type = db.Column(db.SMALLINT)
  assert_type = db.Column(db.SMALLINT)
  extract_type = db.Column(db.SMALLINT)
  add_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer)

  def __init__(self, pid, domain, method, path, param_type, assert_type, extract_type, user_id):
    self.pid = pid
    self.domain = domain
    self.method = method
    self.path = path
    self.param_type = param_type
    self.assert_type = assert_type
    self.extract_type = extract_type
    self.user_id = user_id
    self.add_time = datetime.now()
