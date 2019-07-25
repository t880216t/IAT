import {
  queryHomeData,
  queryHomeFailCase,
  queryAddCase,
} from '@/services/api';

const TaskModel = {
  namespace: 'home',
  state: {
    homeData: {},
    failCaseData: [],
  },
  effects: {
    *queryHomeData({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { homeData: [] } });
      const response = yield call(queryHomeData, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { homeData: response.content } });
      }
    },
    *queryHomeFailCase({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { failCaseData: [] } });
      const response = yield call(queryHomeFailCase, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { failCaseData: response.content } });
      }
    },
    *queryAddCase({ payload }, { call, put }) {
      yield call(queryAddCase, payload);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default TaskModel;
