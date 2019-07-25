import {
  queryTaskList,
  queryAddCase,
  queryAddTask,
  queryTaskExcute,
  queryTaskDelete,
  queryCaseTreeList,
  queryTaskReport,
  queryTaskInfo,
  queryUpdateTask,
  queryUpdateTaskStatus,
  queryTaskReportByDate,
} from '@/services/api';
import { routerRedux } from 'dva/router';

const TaskModel = {
  namespace: 'task',
  state: {
    taskList: [],
    treeList: [],
    taskResult: {},
    taskInfo: {},
  },
  effects: {
    *goAddPage(_, { put }) {
      yield put(routerRedux.push('/task/ui/immediate/add'));
    },
    *goTimAddPage(_, { put }) {
      yield put(routerRedux.push('/task/ui/timing/add'));
    },
    *goListPage(_, { put }) {
      yield put(routerRedux.push('/task/ui/immediate'));
    },
    *goTimListPage(_, { put }) {
      yield put(routerRedux.push('/task/ui/timing'));
    },
    *goDetailPage({payload}, { put }) {
      yield put(routerRedux.push(`/task/ui/immediate/detail?${payload.detailId}`));
    },
    *goReportPage({payload}, { put }) {
      yield put(routerRedux.push(`/task/ui/immediate/report?${payload.id}`));
    },
    *goTimReportPage({payload}, { put }) {
      yield put(routerRedux.push(`/task/ui/timing/report?${payload.id}`));
    },
    *queryTaskList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskList: [] } });
      const response = yield call(queryTaskList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { taskList: response.content } });
      }
    },
    *queryCaseTreeList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { treeList: [] } });
      const response = yield call(queryCaseTreeList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { treeList: response.content } });
      }
    },
    *queryTaskReport({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskResult: [] } });
      const response = yield call(queryTaskReport, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { taskResult: response.content } });
      }
    },
    *queryTaskInfo({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskInfo: [] } });
      const response = yield call(queryTaskInfo, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { taskInfo: response.content } });
      }
    },
    *queryTaskReportByDate({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskResult: [] } });
      const response = yield call(queryTaskReportByDate, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { taskResult: response.content } });
      }
    },
    *queryAddCase({ payload }, { call, put }) {
      yield call(queryAddCase, payload);
    },
    *queryUpdateTaskStatus({ payload }, { call, put }) {
      yield call(queryUpdateTaskStatus, payload);
    },
    *queryAddTask({ payload }, { call, put }) {
      yield call(queryAddTask, payload);
    },
    *queryUpdateTask({ payload }, { call, put }) {
      yield call(queryUpdateTask, payload);
    },
    *queryTaskDelete({ payload }, { call, put }) {
      yield call(queryTaskDelete, payload);
    },
    *queryTaskExcute({ payload }, { call, put }) {
      yield call(queryTaskExcute, payload);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default TaskModel;
