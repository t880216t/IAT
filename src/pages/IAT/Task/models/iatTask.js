import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {
  queryProjectCaseList,
  queryAddTask,
  queryTaskList,
  queryTaskExcute,
  queryTaskDelete,
  queryTaskInfo,
  queryUpdateTaskInfo,
  queryTaskResult,
  querySetTaskStatus,
  queryUpdateRunTime,
} from '@/services/iatApi';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'iatTask',
  state: {
    caseData: [],
    taskResult: {},
  },

  effects: {
    *goAddPage(_, { put }) {
      yield put(routerRedux.push('/task/api/immediate/add'));
    },
    *goTimAddPage(_, { put }) {
      yield put(routerRedux.push('/task/api/timing/add'));
    },
    *goListPage(_, { put }) {
      yield put(routerRedux.goBack('/task/api/immediate'));
    },
    *goDetailPage({ payload }, { put }) {
      yield put(routerRedux.push(`/task/api/immediate/detail?${payload.detailId}`));
    },
    *queryAddTask({ payload }, { call, put }) {
      const response = yield call(queryAddTask, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success(response.msg);
            yield put(routerRedux.goBack('/task/api/immediate'));
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryUpdateTaskInfo({ payload }, { call, put }) {
      const response = yield call(queryUpdateTaskInfo, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success(response.msg);
            yield put(routerRedux.goBack('/task/api/immediate'));
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryTaskExcute({ payload }, { call, put }) {
      const response = yield call(queryTaskExcute, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success(response.msg);
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryUpdateRunTime({ payload }, { call, put }) {
      const response = yield call(queryUpdateRunTime, payload);
      if (response) {
        switch (response.code) {
          case 0:
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *querySetTaskStatus({ payload }, { call, put }) {
      const response = yield call(querySetTaskStatus, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success(response.msg);
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryTaskDelete({ payload }, { call, put }) {
      const response = yield call(queryTaskDelete, payload);
      if (response) {
        switch (response.code) {
          case 0:
            message.success(response.msg);
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryProjectCaseList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { caseData: [] } });
      const response = yield call(queryProjectCaseList, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({ type: 'updateState', payload: { caseData: response.content } });
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryTaskResult({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskResult: {} } });
      const response = yield call(queryTaskResult, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({ type: 'updateState', payload: { taskResult: response.content } });
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryTaskList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskList: [] } });
      const response = yield call(queryTaskList, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({ type: 'updateState', payload: { taskList: response.content } });
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
    *queryTaskInfo({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskInfo: [] } });
      const response = yield call(queryTaskInfo, payload);
      if (response) {
        switch (response.code) {
          case 0:
            yield put({ type: 'updateState', payload: { taskInfo: response.content } });
            break;
          case 10001:
            message.warning(response.msg);
            break;
          case 10002:
            message.warning(response.msg);
            break;
          case 99999:
            reloadAuthorized();
            message.error(response.msg);
            yield put(routerRedux.push('/user/login'));
            break;
          default:
            message.warning('出现了什么鬼');
        }
      } else {
        message.error('服务器异常！');
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
