import {
  queryLogin,
  queryLogout,
  queryRegister,
  queryGetHomeBack,
} from '@/services/api';
import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    homeback: {},
  },
  effects: {
    *queryGetHomeBack({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { homeback: {} } });
      const response = yield call(queryGetHomeBack, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { homeback: response.content } });
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(queryLogin, payload);
      if (response) {
        if (response.code === 0) {
          // Login successfully
          yield put({
            type: 'changeLoginStatus',
            payload: response,
          });
          reloadAuthorized();
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        }
      }
    },
    *queryRegister({ payload }, { call, put }) {
      const response = yield call(queryRegister, payload);
      if (response) {
        if (response.code === 0) {
          message.success(response.msg);
        }
      }
    },
    *logout(_, { call, put }) {
      const { redirect } = getPageQuery(); // redirect
      yield call(queryLogout);

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.currentAuthority !== null) {
        switch (payload.currentAuthority) {
          case 0:
            setAuthority('user');
            break;
          case 1:
            setAuthority('admin');
            break;
          default:
            setAuthority('guest');
        }
      } else {
        message.warning('你没有使用权限，请联系管理员', 10);
      }
      return {
        ...state,
        status: payload.code,
        type: payload.type,
      };
    },
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
