from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

class Test(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255))
  content = db.Column(db.String(1000))

  def __init__(self,title, content):
    self.title = title
    self.content = content


class users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True)
    email = db.Column(db.String(40), unique=True)
    phoneNumber = db.Column(db.String(255), unique=True)
    hash_password = db.Column(db.String(80))
    salt = db.Column(db.String(80))
    account_type = db.Column(db.Integer)
    get_status = db.Column(db.SMALLINT)
    status = db.Column(db.SMALLINT)
    szwego_url = db.Column(db.String(255))
    szwego_token = db.Column(db.String(500))
    add_time = db.Column(db.DateTime)

    def __init__(self, username,hash_password,salt,email,account_type,status):
        self.username = username
        self.hash_password = hash_password
        self.salt = salt
        self.email = email
        self.account_type = account_type
        self.status = status
        self.add_time = datetime.now()
