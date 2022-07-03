
export default {
  'POST /api/api_v3/task/taskList': {
    "code": 0,
    "content": {
      "data": [{
        "addTime": "2022-05-11 18:16:11",
        "addUser": "西　东",
        "id": 513,
        "isTop": false,
        "project_id": 1,
        "project_name": '测试项目',
        "lastLog": {
          "fail": 0,
          "success": 6,
          "total": 6
        },
        "name": "定时巡检的用例",
        "nextTime": "2022-05-19 06:00:00",
        "status": 3,
        "taskType": 3,
        "updateTime": "2022-05-18 06:02:59",
        "updateUser": "西　东"
      },{
        "addTime": "2022-05-11 18:16:11",
        "addUser": "西　东",
        "id": 5113,
        "isTop": false,
        "project_id": 1,
        "project_name": '测试项目',
        "lastLog": {
          "fail": 0,
          "success": 6,
          "total": 6
        },
        "name": "定时巡检的用例",
        "nextTime": "2022-05-19 06:00:00",
        "status": 1,
        "taskType": 3,
        "updateTime": "2022-05-18 06:02:59",
        "updateUser": "西　东"
      },{
        "addTime": "2022-05-11 18:16:11",
        "addUser": "西　东",
        "id": 5123,
        "isTop": false,
        "project_id": 1,
        "project_name": '测试项目',
        "lastLog": {
          "fail": 0,
          "success": 6,
          "total": 6
        },
        "name": "定时巡检的用例",
        "nextTime": "2022-05-19 06:00:00",
        "status": 0,
        "taskType": 3,
        "updateTime": "2022-05-18 06:02:59",
        "updateUser": "西　东"
      },{
        "addTime": "2022-05-11 18:16:11",
        "addUser": "西　东",
        "id": 51213,
        "isTop": false,
        "project_id": 1,
        "project_name": '测试项目',
        "lastLog": {
          "fail": 0,
          "success": 6,
          "total": 6
        },
        "name": "定时巡检的用例",
        "nextTime": "2022-05-19 06:00:00",
        "status": 4,
        "taskType": 3,
        "updateTime": "2022-05-18 06:02:59",
        "updateUser": "西　东"
      },],
      "total": 9
    },
    "msg": "操作成功"
  },
  'POST /api/api_v3/task/taskInfo': {
    "code": 0,
    "content": {
      'id': 123,
      'name': 'xxx版本接口测试任务',
      'project': 1,
      'task_type': 2,
      'cron': '8 2 3 * * *',
      'proxy': 'http://127.0.0.1:8888',
      'description': 'this is mock',
      'env_id': 1,
      'addInfo': '测试  2011-11-11 11:11:11',
      'updateInfo': '1测试  2011-11-11 11:11:12',
    },
    "msg": "操作成功"
  },
  'POST /api/api_v3/task/taskCaseList': {
    "code": 0,
    "content": [{
      'case_id': '123',
      'case_name': 'xxx版s接口测试任务',
      'level': 0,
      'api_id': 12,
      'api_name': '那啥',
      'module_id': 1,
      'module_name': '首页',
      'index': 1
    },{
      'case_id': '1123',
      'case_name': 'xxx版本接口s务',
      'level': 1,
      'api_id': 12,
      'api_name': '那啥',
      'module_id': 1,
      'module_name': '首页',
      'index': 2
    },{
      'case_id': '1223',
      'case_name': 'xxx版本接口测ff试任务',
      'level': 2,
      'api_id': 12,
      'api_name': '那啥',
      'module_id': 1,
      'module_name': '首页',
      'index': 3
    },{
      'case_id': '1243',
      'case_name': 'xxx版本sdfdsfs接口测试任务',
      'level': 1,
      'api_id': 12,
      'api_name': '那啥',
      'module_id': 1,
      'module_name': '首页',
      'index': 4
    },],
    "msg": "操作成功"
  },

  'POST /api/api_v3/task/taskAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/task/taskDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/task/taskUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/task/taskExec': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/task/taskCopy': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

};
