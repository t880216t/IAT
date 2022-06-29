
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
  'POST /api/api_v3/case/apiList': {
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
  'POST /api/api_v3/case/apiInfo': {
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
        },{
          id: 1213,
          key: 'Content-Type',
          value: 'application/json',
        },],
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
          id: 1232,
          key: 'file_name',
          type: 'text/file',
          required: 1,
          path: 'https://test.com/file/123.png',
          description: 'test',
        }]
      }
    },
    msg: '操作成功'
  },
  'POST /api/api_v3/case/apiAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/apiCopy': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/apiDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/apiMove': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/case/apiCaseList': {
    code: 0,
    content: [
      {
        id: 1,
        level: 0,
        name: '检查正确账号密码登录成功',
        desc: '我是一条测试的描述',
        status: 1,
        label: ['核心转化', '登录'],
        updateUser: '陈   皮',
        updateTime: '2022-05-02 12:34:22'
      },
      {
        id: 2,
        level: 1,
        name: '检查错误密码无法登录',
        desc: '我是一条测试的描述',
        status: 1,
        label: ['核心转化', '登录'],
        updateUser: '陈   皮',
        updateTime: '2022-05-02 12:34:22'
      },
      {
        id: 3,
        level: 2,
        name: '检查密码为空时提示正确',
        desc: '我是一条测试的描述',
        status: 1,
        label: ['核心转化', '登录'],
        updateUser: '陈   皮',
        updateTime: '2022-05-02 12:34:22'
      },
    ],
    msg: ''
  },

  'GET /api/api_v3/case/apiCaseTags': {
    code: 0,
    content: [
      {
        label: 'item 1',
        value: 'a',
      },
      {
        label: 'item 2',
        value: 'b',
      },
      {
        label: 'item 3',
        value: 'c',
      },
    ],
    msg: '操作成功'
  },

  'POST /api/api_v3/case/apiCaseAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/case/apiCaseInfoUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/case/apiCaseMake': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/apiCaseCopy': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/case/apiCaseDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
};
