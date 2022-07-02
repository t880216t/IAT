import {
  queryTaskList,
  queryTaskInfo,
  queryTaskCaseList,
} from './service';
const Model = {
  namespace: 'iatTask',
  state: {
    taskList: {},
    taskInfo: {},
  },
  effects: {
    *queryTaskList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskList: {} } });
      const response = yield call(queryTaskList, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { taskList: response.content } });
      }
    },
    *queryTaskInfo({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskInfo: {} } });
      const response = yield call(queryTaskInfo, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { taskInfo: response.content } });
      }
    },
    *queryTaskCaseList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskCaseList: {} } });
      const response = yield call(queryTaskCaseList, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { taskCaseList: response.content } });
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
