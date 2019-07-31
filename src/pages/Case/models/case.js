import {
  queryCaseData,
  queryTreeList,
  queryAddCase,
  queryAddSubFolder,
  queryAddCustomKeyword,
  queryDeleteCase,
  queryDeleteFolder,
  queryCopyCase,
  queryAddCaseStep,
  queryDeleteStep,
  queryInsertStep,
  queryUpdateCaseStep,
  queryCaseProjectConfig,
  queryDragStep,
  queryGetLibs,
  queryUpdateProjectLibConfig,
  querySearchKeywords,
  queryAddStepIndexDesc,
  queryGetStepIndexDesc,
  queryGetKeywordInfo,
  queryAddDebugTask,
  queryDeleteStepIndexDesc,
  queryUpdateKeywordInfo,
  queryUpdateCaseInfo,
  queryUpdateStepIndexDesc,
  queryUploadTreeName,
  queryAddGlobalFile,
  queryDeleteGlobalFile,
} from '@/services/api';

const CaseModel = {
  namespace: 'caseInfo',
  state: {
    caseData: {},
    stepDoc: null,
    addedCase: {},
    caseProjectConfig: {},
    treeList: [],
    libsList: [],
    keywordList: [],
  },
  effects: {
    *queryCaseData({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { caseData: {} } });
      const response = yield call(queryCaseData, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { caseData: response.content } });
      }
    },
    *queryCaseDataWihtOutLoading({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { caseData: {} } });
      const response = yield call(queryCaseData, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { caseData: response.content } });
      }
    },
    *queryTreeList({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { treeList: [] } });
      const response = yield call(queryTreeList, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { treeList: response.content } });
      }
    },
    *queryGetLibs({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { libsList: [] } });
      const response = yield call(queryGetLibs, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { libsList: response.content } });
      }
    },
    *querySearchKeywords({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { keywordList: [] } });
      const response = yield call(querySearchKeywords, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { keywordList: response.content } });
      }
    },
    *queryGetStepIndexDesc({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { stepDoc: null } });
      const response = yield call(queryGetStepIndexDesc, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { stepDoc: response.content } });
      }
    },
    *queryGetKeywordInfo({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { keywordInfo: null } });
      const response = yield call(queryGetKeywordInfo, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { keywordInfo: response.content } });
      }
    },
    *queryAddDebugTask({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { taskInfo: null } });
      const response = yield call(queryAddDebugTask, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { taskInfo: response.content } });
      }
    },
    *queryAddStepIndexDesc({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { newStepIndexId: null } });
      const response = yield call(queryAddStepIndexDesc, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { newStepIndexId: response.content.id } });
      }
    },
    *queryAddCaseStep({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { addedCase: {} } });
      const response = yield call(queryAddCaseStep, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { addedCase: response.content } });
      }
    },
    *queryCaseProjectConfig({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { caseProjectConfig: {} } });
      const response = yield call(queryCaseProjectConfig, payload);
      if (response) {
        yield put({ type: 'updateState', payload: { caseProjectConfig: response.content } });
      }
    },
    *queryAddCase({ payload }, { call, put }) {
      yield call(queryAddCase, payload);
    },
    *queryAddGlobalFile({ payload }, { call, put }) {
      yield call(queryAddGlobalFile, payload);
    },
    *queryDeleteGlobalFile({ payload }, { call, put }) {
      yield call(queryDeleteGlobalFile, payload);
    },
    *queryUpdateStepIndexDesc({ payload }, { call, put }) {
      yield call(queryUpdateStepIndexDesc, payload);
    },
    *queryUpdateKeywordInfo({ payload }, { call, put }) {
      yield call(queryUpdateKeywordInfo, payload);
    },
    *queryUpdateCaseInfo({ payload }, { call, put }) {
      yield call(queryUpdateCaseInfo, payload);
    },
    *queryUploadTreeName({ payload }, { call, put }) {
      yield call(queryUploadTreeName, payload);
    },
    *queryDeleteStepIndexDesc({ payload }, { call, put }) {
      yield call(queryDeleteStepIndexDesc, payload);
    },
    *queryDragStep({ payload }, { call, put }) {
      yield call(queryDragStep, payload);
    },
    *queryUpdateCaseStep({ payload }, { call, put }) {
      yield call(queryUpdateCaseStep, payload);
    },
    *queryAddSubFolder({ payload }, { call, put }) {
      yield call(queryAddSubFolder, payload);
    },
    *queryAddCustomKeyword({ payload }, { call, put }) {
      yield call(queryAddCustomKeyword, payload);
    },
    *queryUpdateProjectLibConfig({ payload }, { call, put }) {
      yield call(queryUpdateProjectLibConfig, payload);
    },
    *queryDeleteFolder({ payload }, { call, put }) {
      yield call(queryDeleteFolder, payload);
    },
    *queryDeleteCase({ payload }, { call, put }) {
      yield call(queryDeleteCase, payload);
    },
    *queryDeleteStep({ payload }, { call, put }) {
      yield call(queryDeleteStep, payload);
    },
    *queryInsertStep({ payload }, { call, put }) {
      yield call(queryInsertStep, payload);
    },
    *queryCopyCase({ payload }, { call, put }) {
      yield call(queryCopyCase, payload);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default CaseModel;
