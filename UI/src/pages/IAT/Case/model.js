import {
  queryProjectListPre,
  queryProjectTreeData,
} from './service';
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
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
