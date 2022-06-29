import {
  queryProjectTreeData,
  queryModuleAdd,
  queryModuleCopy,
  queryModuleDel,
  queryModuleUpdate,
  queryApiInfo,
  queryApiAdd,
  queryApiCopy,
  queryApiDelete,
  queryApiMove,
  queryApiCaseList,
  queryApiCaseAdd,
  queryApiCaseInfoUpdate,
  queryApiCaseMake,
  queryApiCaseCopy,
  queryApiCaseDelete,
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
    apiInfo: {},
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
    *queryApiInfo({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { apiInfo: {} } });
      const response = yield call(queryApiInfo, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { apiInfo: response.content } });
      }
    },
    *queryApiAdd({ payload }, { call, put }) {
      const response = yield call(queryApiAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiCopy({ payload }, { call, put }) {
      const response = yield call(queryApiCopy, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiDelete({ payload }, { call, put }) {
      const response = yield call(queryApiDelete, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiMove({ payload }, { call, put }) {
      const response = yield call(queryApiMove, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiCaseList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { caseList: {} } });
      const response = yield call(queryApiCaseList, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { caseList: response.content } });
      }
    },
    *queryApiCaseAdd({ payload }, { call, put }) {
      const response = yield call(queryApiCaseAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiCaseMake({ payload }, { call, put }) {
      const response = yield call(queryApiCaseMake, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiCaseInfoUpdate({ payload }, { call, put }) {
      const response = yield call(queryApiCaseInfoUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiCaseCopy({ payload }, { call, put }) {
      const response = yield call(queryApiCaseCopy, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryApiCaseDelete({ payload }, { call, put }) {
      const response = yield call(queryApiCaseDelete, payload);
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
