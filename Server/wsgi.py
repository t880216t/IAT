# -*- coding: utf-8 -*-

import os
from dotenv import load_dotenv
from app import create_app
from app.configs import Path

if os.path.exists(Path.env):
    load_dotenv(Path.env)

app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0')