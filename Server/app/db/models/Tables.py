from app.extensions import db
from datetime import datetime


class Task(db.Model):
  """
  CREATE TABLE task_info (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      work_dir varchar(500),
      user_id INTEGER,
      add_time datetime,
      update_time datetime,
      status INTEGER,
      result_url varchar(500));
      file_list varchar(4000));
  """
  __tablename__ = 'task_info'
  id = db.Column(db.Integer, primary_key=True)
  work_dir = db.Column(db.String(500))
  user_id = db.Column(db.INTEGER)
  add_time = db.Column(db.DateTime)
  update_time = db.Column(db.DateTime)
  status = db.Column(db.INTEGER)
  result_url = db.Column(db.String(500))
  file_list = db.Column(db.String(4000))

  def __init__(self, user_id, file_list, status):
    self.file_list = file_list
    self.user_id = user_id
    self.status = status
    self.add_time = datetime.now()