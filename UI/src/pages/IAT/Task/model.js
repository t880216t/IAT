import {
  queryTaskList,
  queryTaskInfo,
  queryTaskCaseList,
  queryTaskAdd,
  queryTaskDel,
  queryTaskCopy,
  queryTaskUpdate,
  queryTaskExec,
  queryTaskStop,
} from './service';
import {queryModuleUpdate} from "@/pages/IAT/Case/service";
import {message} from "antd";
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
    *queryTaskAdd({ payload }, { call, put }) {
      const response = yield call(queryTaskAdd, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryTaskDel({ payload }, { call, put }) {
      const response = yield call(queryTaskDel, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryTaskCopy({ payload }, { call, put }) {
      const response = yield call(queryTaskCopy, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryTaskUpdate({ payload }, { call, put }) {
      const response = yield call(queryTaskUpdate, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryTaskExec({ payload }, { call, put }) {
      const response = yield call(queryTaskExec, payload);
      if (response && response.code !== 0) {
        message.error(response.msg)
      }
    },
    *queryTaskStop({ payload }, { call, put }) {
      const response = yield call(queryTaskStop, payload);
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
