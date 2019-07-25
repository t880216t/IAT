#!/usr/bin/env bash

function inst_allInOne() {
  inst_configureOS
  inst_cnpm
  initNodeModules
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

function initNodeModules() {
    echo "安装前端依赖"
    cnpm i
}
