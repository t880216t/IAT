from minio import Minio
from minio.error import MinioException
from logzero import logger
from app import create_app

app = create_app()

def upload_file_to_minio_server(file_path, save_name):
  try:
    is_secure = app.config['MINIO_SECURE'] == str(True)
    minio_client = Minio(
        app.config['MINIO_SERVER'],
        access_key=app.config['MINIO_USER'],
        secret_key=app.config['MINIO_PASSWORD'],
        secure=is_secure
    )
    download_url = f"{app.config['MINIO_METHOD']}://{app.config['MINIO_SERVER']}/{app.config['MINIO_BUCKET']}/{save_name}"
    minio_client.fput_object(app.config['MINIO_BUCKET'], save_name, file_path)
    return download_url
  except MinioException as err:
    logger.error(str(err))
    return None


if __name__ == '__main__':
    upload_file_to_minio_server('', 'sdfs')