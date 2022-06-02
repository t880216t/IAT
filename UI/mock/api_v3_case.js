
export default {
  'POST /api/api_v3/case/treeData': {
    "code": 0,
    "content": [
      {
        "id": 305,
        "text": "首页",
        "pid": 1,
        "items":[{
          "id": 3051,
          "pid": 305,
          "text": "专区",
        }]
      },
      {
        "id": 306,
        "pid": 1,
        "text": "搜索",
      },
      {
        "id": 307,
        "pid": 1,
        "text": "活动",
      },
      {
        "id": 308,
        "pid": 1,
        "text": "个人中心",
      },
    ],
    "msg": ""
  },
  'POST /api/api_v3/case/caseList': {
    "code": 0,
    "content": {
      "data": [
        {
          "id": 405,
          "labels": [
            "安全",
          ],
          "name": "获取首页banner",
          "method": "get",
          "path": "/api/test/add",
          "caseCount": 12,
          "updateTime": "2022-05-13 17:06:54",
          "updateUser": "陈　皮"
        },
      ],
      "total": 2
    },
    "msg": "操作成功"
  },
  'POST /api/api_v3/case/moduleAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/moduleCopy': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/moduleDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/moduleUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/caseAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/caseCopy': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/caseDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/caseMove': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
};
