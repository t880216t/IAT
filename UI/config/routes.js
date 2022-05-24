export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/iat/case',
    name: '接口列表',
    icon: 'table',
    routes: [
      {
        path: '/iat/case',
        redirect: '/iat/case/root',
      },
      {
        path: '/iat/case/root',
        name: '接口定义',
        component: './IAT/Case/index',
      },
      {
        path: '/iat/case/detail',
        name: '接口详情页',
        hideInMenu: true,
        component: './IAT/Case/CaseDetail',
      },
    ],
  },
  {
    path: '/iat/task',
    name: '任务管理',
    icon: 'table',
    routes: [
      {
        path: '/iat/task/immTask',
        name: '即时任务',
        icon: 'smile',
        component: './IAT/Task/immTask',
      },
      {
        path: '/iat/task/timTask',
        name: '定时任务',
        icon: 'smile',
        component: './IAT/Task/timTask',
      },
      {
        path: '/iat/task/detail',
        name: '任务详情',
        hideInMenu: true,
        component: './IAT/Task/TaskDetail',
      }
    ],
  },
  {
    path: '/system',
    name: '系统设置',
    icon: 'setting',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/system/sub-page',
        name: '项目设置',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
