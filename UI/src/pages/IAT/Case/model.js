import {
} from './service';
const Model = {
  namespace: 'iatCase',
  state: {
    test: 'test'
  },
  effects: {
    *queryTest({ payload }, { call, put }) {
      // yield put({ type: 'updateState', payload: { test: "" } });
      // const response = yield call(queryTest, payload);
      // if (response && response.code === 0) {
      //   yield put({ type: 'updateState', payload: { browserList: response.content.list } });
      // }
      console.log('====');
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
