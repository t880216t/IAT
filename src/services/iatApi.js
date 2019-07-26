import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAddProject(params) {
  return request('/api/IAT/addProject', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddTask(params) {
  return request('/api/IAT/addTask', {
    method: 'POST',
    data: params,
  });
}
export async function queryUpdateTreeIndex(params) {
  return request('/api/IAT/updateTreeIndex', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateTaskInfo(params) {
  return request('/api/IAT/updateTaskInfo', {
    method: 'POST',
    data: params,
  });
}

export async function querySetProjectStatus(params) {
  return request('/api/IAT/setProjectStatus', {
    method: 'POST',
    data: params,
  });
}

export async function querySetTaskStatus(params) {
  return request('/api/IAT/updateTaskStatus', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateFolderName(params) {
  return request('/api/IAT/updateFolderName', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddSubFolder(params) {
  return request('/api/IAT/addSubFolder', {
    method: 'POST',
    data: params,
  });
}
export async function queryDeleteFolder(params) {
  return request('/api/IAT/deleteFolder', {
    method: 'POST',
    data: params,
  });
}
export async function queryDeleteCase(params) {
  return request('/api/IAT/deleteCase', {
    method: 'POST',
    data: params,
  });
}
export async function queryCopyCase(params) {
  return request('/api/IAT/copyCase', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddCase(params) {
  return request('/api/IAT/addCase', {
    method: 'POST',
    data: params,
  });
}

export async function queryTreeInfo(params) {
  return request('/api/IAT/getTreeInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectCaseList(params) {
  return request('/api/IAT/projectCaseList', {
    method: 'POST',
    data: params,
  });
}

export async function queryExtractList(params) {
  return request('/api/IAT/getExtractList', {
    method: 'POST',
    data: params,
  });
}
export async function queryUpdateSample(params) {
  return request('/api/IAT/updateSample', {
    method: 'POST',
    data: params,
  });
}
export async function querySampleInfo(params) {
  return request('/api/IAT/getSampleInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryDebugSample(params) {
  return request('/api/IAT/debugSample', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskList(params) {
  return request('/api/IAT/taskList', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskExcute(params) {
  return request('/api/IAT/taskExcute', {
    method: 'POST',
    data: params,
  });
}
export async function queryUpdateRunTime(params) {
  return request('/api/IAT/updateRunTime', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskDelete(params) {
  return request('/api/IAT/taskDelete', {
    method: 'POST',
    data: params,
  });
}

export async function queryUploadTreeName(params) {
  return request('/api/IAT/uploadTreeName', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddGlobalValues(params) {
  return request('/api/IAT/addGlobalValues', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteGlobalValues(params) {
  return request('/api/IAT/deleteGlobalValues', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateGlobalValues(params) {
  return request('/api/IAT/updateGlobalValues', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectList(params) {
  return request(`/api/IAT/projectList?status=${params.status.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryTaskInfo(params) {
  return request(`/api/IAT/taskPrew?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryProjectGlobalValues(params) {
  return request(`/api/IAT/projectGlobalValues?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryProjectRootInfo(params) {
  return request(`/api/IAT/projectRootInfo?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryTaskResult(params) {
  return request(`/api/IAT/taskResult?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryTreeList(params) {
  return request(`/api/IAT/treeList?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryHomeData(params) {
  return request(`/api/IAT/getHomeData?_=${new Date().getTime().toString()}`);
}

//==========

export async function queryAddGood(params) {
  return request('/api/shop/addGood', {
    method: 'POST',
    data: params,
  });
}

export async function querySaveGood(params) {
  return request('/api/shop/saveGood', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateGood(params) {
  return request('/api/shop/updateGood', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddClass(params) {
  return request('/api/shop/addClass', {
    method: 'POST',
    data: params,
  });
}

export async function querySetGoodStatus(params) {
  return request('/api/shop/setGoodStatus', {
    method: 'POST',
    data: params,
  });
}

export async function querySetClassStatuss(params) {
  return request('/api/shop/setClassStatus', {
    method: 'POST',
    data: params,
  });
}

export async function queryDownImage(params) {
  return request('/api/shop/downImage', {
    method: 'POST',
    data: params,
  });
}

export async function queryClassList(params) {
  return request(`/api/shop/classList?status=${params.status.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryShopGoodInfo() {
  return request(`/api/shop/shopGoodInfo?_=${new Date().getTime().toString()}`);
}

export async function queryGetScan() {
  return request(`/api/shop/getScanUrl?_=${new Date().getTime().toString()}`);
}

export async function queryScanState() {
  return request(`/api/shop/getScanState?_=${new Date().getTime().toString()}`);
}

export async function refuseScanUrl() {
  return request(`/api/shop/refuseScanUrl?_=${new Date().getTime().toString()}`);
}

export async function queryGetToolsList(params) {
  return request(`/api/shop/getToolsList?_=${new Date().getTime().toString()}&pageIndex=${params.pageIndex.toString()}`);
}

export async function queryGoodDetail(params) {
  return request(`/api/shop/goodDetail?detailId=${params.detailId.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryGoodList(params) {
  return request(`/api/shop/goodList?status=${params.status.toString()}&searchKey=${params.searchKey.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryAccountLogout() {
  return request(`/api/auth/logout?_=${new Date().getTime().toString()}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/auth/register', {
    method: 'POST',
    data: params,
  });
}

//=======================================


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
