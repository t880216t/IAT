import {
  queryTaskList,
} from './service';
const Model = {
  namespace: 'iatTask',
  state: {
    taskList: {},
  },
  effects: {
    *queryTaskList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskList: "" } });
      const response = yield call(queryTaskList, payload);
      if (response && response.code === 0) {
        yield put({ type: 'updateState', payload: { taskList: response.content } });
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
