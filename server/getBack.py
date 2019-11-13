#!venv/bin/python
import requests
from bs4 import BeautifulSoup
from app.tables.UAT import HomeBack
from app import db

def getImageList():
  largImg = 'https://images.freeimages.com/images/large-previews/'
  imgList = []
  url = 'https://cn.freeimages.com/'
  headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
  }
  r = requests.get(url, headers=headers, verify=False)
  soup = BeautifulSoup(r.text, 'lxml')
  list_content = soup.find('div', class_='collage-body')
  for link in list_content.find_all(name="img"):
    imgUrl = link.attrs['src']
    # imgUrl = imgUrl.encode('unicode_escape')
    imgList.append(largImg + imgUrl.split('small-previews/')[1])
  return imgList

def saveListToDB(imgList):
  for img in imgList:
    rowData = HomeBack.query.filter_by(url=img).first()
    if not rowData:
      data = HomeBack(img)
      db.session.add(data)
      db.session.commit()
      print('添加：%s' % img)

if __name__ == '__main__':
  try:
    imgList = getImageList()
    saveListToDB(imgList)
  except:
    print("get back fail")
