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
          component: './Case/index',
        },
        {
          path: '/task',
          name: 'task',
          icon: 'apartment',
          routes: [
            // {
            //   path: '/system/index',
            //   name: 'index',
            //   component: './System/index',
            // },
            {
              path: '/task/immediate',
              name: 'immediate',
              hideChildrenInMenu: true,
              routes: [
                {
                  path: '/task/immediate',
                  redirect: '/task/immediate/list',
                },
                {
                  path: '/task/immediate/list',
                  name: 'list',
                  component: './Task/immediate',
                },
                {
                  path: '/task/immediate/add',
                  name: 'add',
                  component: './Task/add',
                },
                {
                  path: '/task/immediate/report',
                  name: 'report',
                  component: './Task/immReport',
                },
                {
                  path: '/task/immediate/detail',
                  name: 'detail',
                  component: './Task/immDetail',
                },
              ],
            },{
              path: '/task/timing',
              name: 'timing',
              hideChildrenInMenu: true,
              routes: [
                {
                  path: '/task/timing',
                  redirect: '/task/timing/list',
                },
                {
                  path: '/task/timing/list',
                  name: 'list',
                  component: './Task/timing',
                },
                {
                  path: '/task/timing/add',
                  name: 'add',
                  component: './Task/timAdd',
                },
                {
                  path: '/task/timing/report',
                  name: 'report',
                  component: './Task/timReport',
                },
                {
                  path: '/task/timing/detail',
                  name: 'detail',
                  component: './Task/timDetail',
                },
              ],
            },
          ],
        },
        {
          path: '/system',
          name: 'system',
          icon: 'code-sandbox',
          authority: ['admin', 'user'],
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
            {
              path: '/system/proxy',
              name: 'proxy',
              component: './System/proxy',
            },
            {
              path: '/system/keywords',
              name: 'keywords',
              component: './System/keywords',
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
