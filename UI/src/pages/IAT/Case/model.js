import {
  queryProjectTreeData,
  queryModuleAdd,
  queryModuleCopy,
  queryModuleDel,
  queryModuleUpdate,
  queryCaseAdd,
  queryCaseCopy,
  queryCaseDelete,
  queryCaseMove,
} from './service';
import {
  queryProjectListPre,
} from '@/pages/IAT/Config/service'
import {message} from 'antd'

const Model = {
  namespace: 'iatCase',
  state: {
    projectList: [],
    treeData: [],
  },
  effects: {
    *queryProjectListPre({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { projectList: "" } });
      const response = yield call(queryProjectListPre, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { projectList: response.content } });
      }
    },
    *queryProjectTreeData({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { treeData: "" } });
      const response = yield call(queryProjectTreeData, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { treeData: response.content } });
      }
    },
    *queryModuleAdd({ payload }, { call, put }) {
      const response = yield call(queryModuleAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryModuleCopy({ payload }, { call, put }) {
      const response = yield call(queryModuleCopy, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryModuleDel({ payload }, { call, put }) {
      const response = yield call(queryModuleDel, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryModuleUpdate({ payload }, { call, put }) {
      const response = yield call(queryModuleUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryCaseAdd({ payload }, { call, put }) {
      const response = yield call(queryCaseAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryCaseCopy({ payload }, { call, put }) {
      const response = yield call(queryCaseCopy, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryCaseDelete({ payload }, { call, put }) {
      const response = yield call(queryCaseDelete, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryCaseMove({ payload }, { call, put }) {
      const response = yield call(queryCaseMove, payload);
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
