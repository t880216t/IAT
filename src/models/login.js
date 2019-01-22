import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, queryAccountLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
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
        console.log('redirect', redirect);
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.warning(response.msg);
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { call, put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      const response = yield call(queryAccountLogout);
      if (response) {
        message.warning(response.msg);
      }
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
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
      }else {
        message.warning("你没有使用权限，请联系管理员",10)
      }
      return {
        ...state,
        status: payload.code,
        type: payload.type,
      };
    },
  },
};
