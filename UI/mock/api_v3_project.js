
export default {
  'POST /api/api_v3/project/projectListPre': {
    code: 0,
    content: [{
        id: 1,
        name: '项目A',
      },{
        id: 2,
        name: '项目B',
      },
    ],
    msg: ''
  },
  'POST /api/api_v3/project/projectList': {
    code: 0,
    content: {
      data: [
        {
          id: 1,
          project_name: '项目A',
          env_count: 3,
          api_count: 3,
          case_count: 3,
          status: 1,
          add_user: '陈   皮',
          add_time: '2022-05-08 12:21:22',
        },
      ],
      total: 12,
    },
    msg: ''
  },
  'POST /api/api_v3/project/projectAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectEnvList': {
    code: 0,
    content: [{
      'id': 1,
      'env_name': '测试环境1',
      'add_time': '2022-06-04 12:12:33',
      'add_user': '老    陈',
    },{
      'id': 2,
      'env_name': '测试环境2',
      'add_time': '2022-06-04 12:12:33',
      'add_user': '老    陈',
    },{
      'id': 3,
      'env_name': '测试环境3',
      'add_time': '2022-06-04 12:12:33',
      'add_user': '老    陈',
    }],
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectEnvUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectEnvAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectEnvCopy': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/projectEnvDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envRequestConfig': {
    code: 0,
    content: {
      method: "HTTP",
      domain: "app.oldboy.run",
      port: 5000,
    },
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envRequestConfigUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envReqHeaderConfig': {
    code: 0,
    content: [{
      id: 1,
      key: "content-type",
      value: "application/json",
      description: "请求参数类型"
    }],
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envReqHeaderConfigAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envReqHeaderConfigDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envReqHeaderConfigUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/project/envParamsConfig': {
    code: 0,
    content: [{
      id: 1,
      key: "content-type",
      type: "text",
      value: "application/json",
      description: "请求参数类型"
    }],
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envParamsConfigAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envParamsConfigDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envParamsConfigUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },

  'POST /api/api_v3/project/envHostConfig': {
    code: 0,
    content: [{
      id: 1,
      key: "content-type",
      value: "application/json",
    }],
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envHostConfigAdd': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envHostConfigDel': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
  'POST /api/api_v3/project/envHostConfigUpdate': {
    code: 0,
    content: {},
    msg: '操作成功'
  },
};
