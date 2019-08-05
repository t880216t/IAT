import {
  queryProjectList,
  queryAddProject,
  queryAddGlobalValues,
  queryDeleteGlobalValues,
  queryProjectGlobalValues,
  queryUpdateGlobalValues,
  queryAddProxyConfig,
  queryProxyConfigList,
  queryDeleteProxyConfig,
  querySetProjectStatus,
  queryGetAllLibs,
  queryGetLibKeywords,
  queryUpdateKeywords,
  queryUserList,
  querySetUserStatus,
  querySetUserType,
  queryProjectVersionList,
  queryAddProjectVersion,
  querySetVersionStatus,
  queryUpdateVersion,
  queryReleaseVersion,
} from '@/services/api';

const SytemModel = {
  namespace: 'system',
  state: {
    projectList: [],
    versionList: [],
    proxyConfigList: [],
    globalValues: [],
    allLibs: [],
    libKeywords: [],
  },
  effects: {
    *queryUserList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { userList: [] } });
      const response = yield call(queryUserList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { userList: response.content } });
      }
    },
    *queryProjectList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { projectList: [] } });
      const response = yield call(queryProjectList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { projectList: response.content } });
      }
    },
    *queryProjectVersionList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { versionList: [] } });
      const response = yield call(queryProjectVersionList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { versionList: response.content } });
      }
    },
    *queryProjectGlobalValues({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { globalValues: [] } });
      const response = yield call(queryProjectGlobalValues, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { globalValues: response.content } });
      }
    },
    *queryProxyConfigList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { proxyConfigList: [] } });
      const response = yield call(queryProxyConfigList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { proxyConfigList: response.content } });
      }
    },
    *queryGetAllLibs({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { allLibs: [] } });
      const response = yield call(queryGetAllLibs, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { allLibs: response.content } });
      }
    },
    *queryGetLibKeywords({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { libKeywords: [] } });
      const response = yield call(queryGetLibKeywords, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { libKeywords: response.content } });
      }
    },
    *queryAddProject({ payload }, { call, put }) {
      yield call(queryAddProject, payload);
    },
    *queryAddProjectVersion({ payload }, { call, put }) {
      yield call(queryAddProjectVersion, payload);
    },
    *queryReleaseVersion({ payload }, { call, put }) {
      yield call(queryReleaseVersion, payload);
    },
    *querySetVersionStatus({ payload }, { call, put }) {
      yield call(querySetVersionStatus, payload);
    },
    *queryUpdateVersion({ payload }, { call, put }) {
      yield call(queryUpdateVersion, payload);
    },
    *queryUpdateKeywords({ payload }, { call, put }) {
      yield call(queryUpdateKeywords, payload);
    },
    *queryDeleteProxyConfig({ payload }, { call, put }) {
      yield call(queryDeleteProxyConfig, payload);
    },
    *querySetProjectStatus({ payload }, { call, put }) {
      yield call(querySetProjectStatus, payload);
    },
    *querySetUserStatus({ payload }, { call, put }) {
      yield call(querySetUserStatus, payload);
    },
    *querySetUserType({ payload }, { call, put }) {
      yield call(querySetUserType, payload);
    },
    *queryAddProxyConfig({ payload }, { call, put }) {
      yield call(queryAddProxyConfig, payload);
    },
    *queryUpdateGlobalValues({ payload }, { call, put }) {
      yield call(queryUpdateGlobalValues, payload);
    },
    *queryAddGlobalValues({ payload }, { call, put }) {
      yield call(queryAddGlobalValues, payload);
    },
    *queryDeleteGlobalValues({ payload }, { call, put }) {
      yield call(queryDeleteGlobalValues, payload);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default SytemModel;
