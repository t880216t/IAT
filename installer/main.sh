#!/usr/bin/env bash

CUR_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$CUR_PATH/functions.sh"

PS3='[请输入您的选择]: '
options=(
    "init (i): 初始化完整安装启动项目"        # 1
    "dev-check (c): 开发环境检查配置"        # 2
    "pull (u): 更新当前项目"                # 3
    "reset (r): 重置 & 清理当前项目"         # 4
    "build (b): 编译当前项目"               # 5
    "db (d): 自动导入数据结构"              # 6
    "run (run): 启动或重启当前服务"          # 7
    "quit: 退出此菜单"                      # 8
    )

function _switch() {
    _reply="$1"
    _opt="$2"

    case $_reply in
        ""|"i"|"init"|"1")
            inst_allInOne
            ;;
        ""|"c"|"dev-check"|"2")
            inst_allInOne
            ;;
        ""|"u"|"pull"|"3")
            inst_updateRepo
            ;;
        ""|"r"|"reset"|"4")
            inst_resetRepo
            ;;
        ""|"b"|"build"|"5")
            bash "$AC_PATH_APPS/compiler/compiler.sh" $_opt
            ;;
        ""|"d"|"db"|"6")
            bash "$AC_PATH_APPS/db_assembler/db_assembler.sh" $_opt
            ;;
        ""|"run"|"run"|"7")
            inst_simple_restarter authserver
            ;;
        ""|"quit"|"8")
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
