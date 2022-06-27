
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
  'POST /api/api_v3/case/caseInfo': {
    code: 0,
    content: {
      id: 12,
      case_name: '获取首页banner信息',
      add_user: '陈  酒',
      add_time: '2022-06-01 12:23:22',
      update_user: '陈  酒',
      update_time: '2022-06-01 12:23:22',
      description: '描述点信息',
      request_config: {
        isCustomHost: 1,
        protocol: 'HTTP',
        host: 'app.test.com',
        port: 5000,
        method: 'GET',
        path: '/api/test/{com_id}',
        encoding: 'UTF-8',
        url_params: [{
          id: 123,
          key: 'com_id',
          required: 1,
          value: '12312412312',
          description: '',
        }],
        headers: [{
          id: 123,
          key: 'sdfd',
          value: '12321',
        }],
        params: [{
          id: 123,
          key: 'sdf',
          required: 1,
          value: 'rwqe',
          description: 'eqweqwe',
        }],
        body: {
          type: 'json',
          text: '{"comId": 123}'
        },
        file: [{
          key: 'file_name',
          required: 1,
          path: 'https://test.com/file/123.png',
          description: '',
        }]
      }
    },
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
