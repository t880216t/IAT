import {
  queryHomeData,
} from '@/services/iatApi';
import { routerRedux } from 'dva/router';
import {message} from 'antd'
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'home',
  state: {
    caseData:[],
    taskResult:{},
  },

  effects: {
    *queryHomeData({ payload }, { call,put  }) {
      yield put({type: 'updateState', payload: {homeData:[]}});
      const response = yield call(queryHomeData, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({type: 'updateState', payload: {homeData:response.content}});
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
