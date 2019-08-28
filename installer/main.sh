#!/usr/bin/env bash

CUR_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$CUR_PATH/functions.sh"

PS3='[请输入您的选择]: '
options=(
    "init (i): 初始化完整安装启动项目"        # 1
    "dev-check (c): 开发环境检查配置"        # 2
    "pull (u): 更新当前项目"                # 3
    "build (b): 编译当前项目"               # 4
    "db (d): 自动导入数据结构"              # 5
    "run (run): 启动或重启当前服务"          # 6
    "quit: 退出此菜单"                      # 7
    )

function _switch() {
    _reply="$1"
    _opt="$2"

    case $_reply in
        ""|"i"|"init"|"1")
            inst_allInOne
            ;;
        ""|"c"|"dev-check"|"2")
            initCheckEnv
            ;;
        ""|"u"|"pull"|"3")
            fetchCode
            ;;
        ""|"b"|"build"|"4")
            buildProject
            ;;
        ""|"d"|"db"|"5")
            importDB
            ;;
        ""|"run"|"run"|"6")
            startService
            ;;
        ""|"quit"|"7")
            echo "再见!"
            exit
            ;;
        ""|"--help")
            echo "可选参数:"
            printf '%s\n' "${options[@]}"
            ;;
        *) echo "参数错误, 请使用 --help 检查可选参数";;
    esac
}

while true
do
    # run option directly if specified in argument
    [ ! -z $1 ] && _switch $@ # old method: "${options[$cmdopt-1]}"
    [ ! -z $1 ] && exit 0

    echo "==== 项目配置 ===="
    select opt in "${options[@]}"
    do
        _switch $REPLY
        break
    done
done
