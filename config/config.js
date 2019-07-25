import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import os from 'os';
import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST, NODE_ENV } = process.env;
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
        uglifyOptions: {
          // remove console.* except console.error
          compress: {
            drop_console: true,
            pure_funcs: ['console.error'],
          },
        },
      }
    : {};
export default {
  // add for transfer to umi
  plugins,
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION ? 'source-map' : false,
  // 路由配置
  routes: [
    // user
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: './User/Login' },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: 'home',
          icon: 'area-chart',
          component: './Home/home',
        },
        {
          path: '/case',
          name: 'case',
          icon: 'bank',
          routes: [
            {
              path: '/case/ui',
              name: 'ui',
              component: './Case/index',
            },
            {
              path: '/case/api',
              name: 'api',
              component: './IAT/Interface/index',
            },
          ],
        },
        {
          path: '/task',
          name: 'task',
          icon: 'apartment',
          routes: [
            {
              path: '/task/ui',
              name: 'ui',
              routes: [
                {
                  path: '/task/ui/immediate',
                  name: 'immediate',
                  hideChildrenInMenu: true,
                  routes: [
                    {
                      path: '/task/ui/immediate',
                      redirect: '/task/ui/immediate/list',
                    },
                    {
                      path: '/task/ui/immediate/list',
                      name: 'list',
                      component: './Task/immediate',
                    },
                    {
                      path: '/task/ui/immediate/add',
                      name: 'add',
                      component: './Task/add',
                    },
                    {
                      path: '/task/ui/immediate/report',
                      name: 'report',
                      component: './Task/immReport',
                    },
                    {
                      path: '/task/ui/immediate/detail',
                      name: 'detail',
                      component: './Task/immDetail',
                    },
                  ],
                },{
                  path: '/task/ui/timing',
                  name: 'timing',
                  hideChildrenInMenu: true,
                  routes: [
                    {
                      path: '/task/ui/timing',
                      redirect: '/task/ui/timing/list',
                    },
                    {
                      path: '/task/ui/timing/list',
                      name: 'list',
                      component: './Task/timing',
                    },
                    {
                      path: '/task/ui/timing/add',
                      name: 'add',
                      component: './Task/timAdd',
                    },
                    {
                      path: '/task/ui/timing/report',
                      name: 'report',
                      component: './Task/timReport',
                    },
                    {
                      path: '/task/ui/timing/detail',
                      name: 'detail',
                      component: './Task/timDetail',
                    },
                  ],
                },
              ],
            },
            {
              path: '/task/api',
              name: 'api',
              routes: [
                {
                  path: '/task/api/immediate',
                  name: 'immediate',
                  hideChildrenInMenu: true,
                  routes: [
                    {
                      path: '/task/api/immediate',
                      name: 'immediate',
                      redirect: '/task/api/immediate/list',
                    },
                    {
                      path: '/task/api/immediate/list',
                      name: 'list',
                      component: './IAT/Task/immediate',
                    },
                    {
                      path: '/task/api/immediate/add',
                      name: 'add',
                      component: './IAT/Task/addImm',
                    },
                    {
                      path: '/task/api/immediate/detail',
                      name: 'detail',
                      component: './IAT/Task/immDetail',
                    },
                    {
                      path: '/task/api/immediate/report',
                      name: 'report',
                      component: './IAT/Task/immReport',
                    },
                  ],
                },
                {
                  path: '/task/api/timing',
                  name: 'timing',
                  hideChildrenInMenu: true,
                  routes: [
                    {
                      path: '/task/api/timing',
                      name: 'timing',
                      redirect: '/task/api/timing/list',
                    },
                    {
                      path: '/task/api/timing/list',
                      name: 'list',
                      component: './IAT/Task/timing',
                    },
                    {
                      path: '/task/api/timing/add',
                      name: 'add',
                      component: './IAT/Task/addTim',
                    },
                    {
                      path: '/task/api/timing/detail',
                      name: 'detail',
                      component: './IAT/Task/immDetail',
                    },
                    {
                      path: '/task/api/timing/report',
                      name: 'report',
                      component: './IAT/Task/timReport',
                    },
                  ],
                },
              ],
            }
          ],
        },
        {
          path: '/config',
          name: 'config',
          icon: 'code-sandbox',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/config/ui',
              name: 'ui',
              routes: [
                {
                  path: '/config/ui/project',
                  name: 'project',
                  component: './System/project',
                },
                {
                  path: '/config/ui/proxy',
                  name: 'proxy',
                  component: './System/proxy',
                },
                {
                  path: '/config/ui/keywords',
                  name: 'keywords',
                  component: './System/keywords',
                },
              ],
            },
            {
              path: '/config/api',
              name: 'api',
              routes: [
                {
                  path: '/config/api/project',
                  name: 'project',
                  component: './IAT/System/project',
                },
              ],
            },
          ],
        },
        {
          path: '/system',
          name: 'system',
          icon: 'setting',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/system/users',
              name: 'users',
              icon: 'user',
              component: './System/project',
            },
          ],
        },
        // {
        //   path: '/test',
        //   name: 'test',
        //   icon: 'bank',
        //   component: './Test/index',
        // },
      ],
    },
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:5000/',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    '/img/': {
      target: 'http://localhost:5000/',
      changeOrigin: true,
      pathRewrite: { '^/img': '' },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
};
