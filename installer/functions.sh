#!/usr/bin/env bash

function inst_allInOne() {
#    inst_configureOS
#    inst_cnpm
#    initNodeModules
#    initPythonEnv
#    configMysql
    checkMysqlClient
}

function startService() {
    copyDistToNginxRoot
    startFlaskServer
    restartNginx
}


function inst_configureOS() {
    echo "当前系统: $OSTYPE"
}

function inst_cnpm() {
    echo "安装前端依赖库"
    npmVersion=`npm -v`
    echo "当前npm版本：${npmVersion}"
    which "cnpm" > /dev/null
    if [ $? -eq 0 ]
    then
        cnpmVersion=`cnpm -v`
        echo "当前cnpm版本：${cnpmVersion}"
    else
        echo "安装cnpm"
        npm install -g cnpm --registry=https://registry.npm.taobao.org
        cnpmVersion=`cnpm -v`
        echo "当前cnpm版本：${cnpmVersion}"
    fi
}

function initCheckEnv() {
    checkJmeter
    checkNode
}

function initNodeModules() {
    if [ -d "node_modules" ];then
        echo "文件夹存在"
        rm -rf node_modules
    else
        echo "文件夹不存在"
    fi
    echo "安装前端依赖"
    cnpm i
}

#function initPythonEnv() {
#    echo "安装服务端pipenv"
#    pip3 install pipenv -i https://pypi.tuna.tsinghua.edu.cn/simple
#    cd server
#    sudo -H pipenv install --three
#    cd ..
#}

function initPythonEnv() {
    echo "安装服务端pyvenv"
    if [ -d "server/venv" ];then
        echo "文件夹存在"
        rm -rf server/venv
    else
        echo "文件夹不存在"
    fi
    pyvenv server/venv
    source server/venv/bin/activate
    pip install -r server/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
    deactivate
}

function buildProject() {
    if [ -d "node_modules" ];then
        echo "打包前端页面"
        npm run build
    else
        echo -e "\033[31m 未安装npm依赖包 \033[0m"
    fi
}

function checkJmeter() {
    if  command -v jmeter > /dev/null; then
        echo -e "\033[32m Jmeter环境可用 \033[0m"
    else
        echo -e "\033[31m 未检查到Jmeter环境 \033[0m"
    fi
}

function checkMysqlClient() {
    if  command -v mysql > /dev/null; then
        echo -e "\033[32m mysql命令可用 \033[0m"
    else
        echo -e "\033[31m 未检查到mysql命令可用 \033[0m"
    fi
}

function checkNode() {
    if  command -v npm > /dev/null; then
        echo -e "\033[32m npm环境可用 \033[0m"
    else
        echo -e "\033[31m 未检查到npm环境 \033[0m"
    fi
}

function configMysql() {
  read -p "mysql host (default:127.0.0.1):" host
  if [ -z "${host}" ];then
    host="127.0.0.1"
  fi
  read -p "mysql port (default:3306):" port
  if [ -z "${port}" ];then
    port="3306"
  fi
  read -p "mysql user:" user
  read -p "mysql password:" password
  read -p "db name :" db_name
  echo "########## mysql config ############"
  echo "# host: ${host}"
  echo "# port: ${port}"
  echo "# user: ${user}"
  echo "# password: ${password}"
  echo "# db name: ${db_name}"
  echo "####################################"
  config="${user}:${password}@${host}:${port}/${db_name}"
  sed -i "s|root:root@127.0.0.1:3306\/IAT|$config|g" server/app/__init__.py
}

function importDB(){
  read -p "mysql host (default:127.0.0.1):" host
  if [ -z "${host}" ];then
    host="127.0.0.1"
  fi
  read -p "mysql port (default:3306):" port
  if [ -z "${port}" ];then
    port="3306"
  fi
  read -p "mysql user:" user
  read -p "mysql password:" password
  read -p "db name :" db_name
  echo "########## mysql config ############"
  echo "# host: ${host}"
  echo "# port: ${port}"
  echo "# user: ${user}"
  echo "# password: ${password}"
  echo "# db name: ${db_name}"
  echo "####################################"
  mysql -u ${user} -p ${password} -h ${host} -P ${port} vvv < server/db/vft.sql
}

function startFlaskServer() {
    if [ -d "server/venv" ];then
        a=`lsof -i:5001 | wc -l`
        if [ "$a" -eq "0" ];then
            echo "端口未被占用"
            echo "启动服务端"
            source server/venv/bin/activate
            cd server
            python run.py
            deactivate
        else
            echo -e "\033[31m 5001端口被占用 \033[0m"
        fi
    else
        echo -e "\033[31m 未安装python虚拟环境 \033[0m"
    fi
}

function copyDistToNginxRoot() {
    ningxRootDir='/usr/local/Cellar/nginx/1.15.8/VFT'
    if [ -d $ningxRootDir ];then
        rm -rf $ningxRootDir/*
        cp -rf dist/* $ningxRootDir
    else
        echo -e "\033[31m 检查nginx 文件夹 \033[0m"
    fi
}

function restartNginx() {
    sudo nginx -s reload
}

function fetchCode() {
    git pull origin VictorinoxForTest
}
