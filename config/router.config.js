export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: 'home',
        icon: 'dashboard',
        component: './Home/index',
      },
      // {
      //   path: '/product',
      //   icon: 'appstore',
      //   name: 'product',
      //   routes: [
      //     {
      //       path: '/product/index',
      //       name: 'productList',
      //       component: './Product/index',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/product/index',
      //           name: 'productList',
      //           redirect: '/product/index/list',
      //         },
      //         {
      //           path: '/product/index/list',
      //           name: 'list',
      //           component: './Product/List',
      //         },
      //         {
      //           path: '/product/index/add',
      //           name: 'add',
      //           component: './Product/Add',
      //         },
      //         {
      //           path: '/product/index/detail',
      //           name: 'detail',
      //           component: './Product/Detail',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/product/class',
      //       name: 'class',
      //       component: './Product/class',
      //     },
      //     {
      //       path: '/product/tools',
      //       name: 'tools',
      //       component: './Product/tools',
      //     },
      //   ],
      // },
      {
        path: '/interface/index',
        name: 'interface',
        icon: 'api',
        component: './IAT/Interface/index',
      },
      {
        path: '/task',
        name: 'task',
        icon: 'cluster',
        routes: [
          {
            path: '/task/immediate',
            name: 'immediate',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/task/immediate',
                name: 'immediate',
                redirect: '/task/immediate/list',
              },
              {
                path: '/task/immediate/list',
                name: 'list',
                component: './IAT/Task/immediate',
              },
              {
                path: '/task/immediate/add',
                name: 'add',
                component: './IAT/Task/addImm',
              },
              {
                path: '/task/immediate/detail',
                name: 'detail',
                component: './IAT/Task/immDetail',
              },
              {
                path: '/task/immediate/report',
                name: 'report',
                component: './IAT/Task/immReport',
              },
            ],
          },
          {
            path: '/task/timing',
            name: 'timing',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/task/timing',
                name: 'timing',
                redirect: '/task/timing/list',
              },
              {
                path: '/task/timing/list',
                name: 'list',
                component: './IAT/Task/timing',
              },
              {
                path: '/task/timing/add',
                name: 'add',
                component: './IAT/Task/addTim',
              },
              {
                path: '/task/timing/detail',
                name: 'detail',
                component: './IAT/Task/immDetail',
              },
              {
                path: '/task/timing/report',
                name: 'report',
                component: './IAT/Task/timReport',
              },
            ],
          },
        ],
      },
      // {
      //   path: '/users',
      //   name: 'users',
      //   icon: 'team',
      //   routes: [
      //     {
      //       path: '/users/index',
      //       name: 'index',
      //       component: './Users/index',
      //     },
      //   ],
      // },
      {
        path: '/system',
        name: 'system',
        icon: 'code-sandbox',
        routes: [
          // {
          //   path: '/system/index',
          //   name: 'index',
          //   component: './System/index',
          // },
          {
            path: '/system/project',
            name: 'project',
            component: './System/project',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
