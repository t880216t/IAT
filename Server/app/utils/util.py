import os
import shutil
from logzero import logger


# 清除本地文件
def clear_project_file(project_path):
  if os.path.exists(project_path):
    delList = os.listdir(project_path)
    for f in delList:
      filePath = os.path.join(project_path, f)
      if os.path.isfile(filePath):
        try:
          os.remove(filePath)
        except:
          logger.warning(f"删除旧文件{filePath}失败")
      elif os.path.isdir(filePath):
        shutil.rmtree(filePath, True)
    try:
      os.rmdir(project_path)
      logger.info(f"Directory: {project_path} was removed!")
    except Exception as e:
      logger.error(str(e))
      logger.error(f"delete has some error")