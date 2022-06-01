import {
  queryProjectEnvList,
  queryProjectEnvUpdate,
  queryProjectEnvAdd,
  queryProjectEnvCopy,
  queryProjectEnvDel,
  queryEnvRequestConfig,
  queryEnvRequestConfigUpdate,
  queryEnvReqHeaderConfig,
  queryEnvReqHeaderConfigDel,
  queryEnvReqHeaderConfigUpdate,
  queryEnvReqHeaderConfigAdd,
  queryEnvParamsConfig,
  queryEnvParamsConfigDel,
  queryEnvParamsConfigUpdate,
  queryEnvParamsConfigAdd,
} from './service';
import {message} from 'antd'

const Model = {
  namespace: 'iatConfig',
  state: {
    envReqConfig: {},
    envReqHeaderConfig: [],
    envParamsConfig: [],
    envList: [],
  },
  effects: {
    *queryProjectEnvList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { envList: [] } });
      const response = yield call(queryProjectEnvList, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { envList: response.content } });
      }
    },
    *queryEnvRequestConfig({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { envReqConfig: {} } });
      const response = yield call(queryEnvRequestConfig, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { envReqConfig: response.content } });
      }
    },
    *queryEnvRequestConfigWithLoading({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { envReqConfig: {} } });
      const response = yield call(queryEnvRequestConfig, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { envReqConfig: response.content } });
      }
    },
    *queryEnvRequestConfigUpdate({ payload }, { call, put }) {
      const response = yield call(queryEnvRequestConfigUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryProjectEnvUpdate({ payload }, { call, put }) {
      const response = yield call(queryProjectEnvUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryProjectEnvAdd({ payload }, { call, put }) {
      const response = yield call(queryProjectEnvAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryProjectEnvCopy({ payload }, { call, put }) {
      const response = yield call(queryProjectEnvCopy, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryProjectEnvDel({ payload }, { call, put }) {
      const response = yield call(queryProjectEnvDel, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },

    *queryEnvReqHeaderConfig({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { envReqHeaderConfig: [] } });
      const response = yield call(queryEnvReqHeaderConfig, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { envReqHeaderConfig: response.content } });
      }
    },
    *queryEnvReqHeaderConfigAdd({ payload }, { call, put }) {
      const response = yield call(queryEnvReqHeaderConfigAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryEnvReqHeaderConfigDel({ payload }, { call, put }) {
      const response = yield call(queryEnvReqHeaderConfigDel, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryEnvReqHeaderConfigUpdate({ payload }, { call, put }) {
      const response = yield call(queryEnvReqHeaderConfigUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },

    *queryEnvParamsConfig({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { envParamsConfig: [] } });
      const response = yield call(queryEnvParamsConfig, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { envParamsConfig: response.content } });
      }
    },
    *queryEnvParamsConfigAdd({ payload }, { call, put }) {
      const response = yield call(queryEnvParamsConfigAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryEnvParamsConfigDel({ payload }, { call, put }) {
      const response = yield call(queryEnvParamsConfigDel, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryEnvParamsConfigUpdate({ payload }, { call, put }) {
      const response = yield call(queryEnvParamsConfigUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
