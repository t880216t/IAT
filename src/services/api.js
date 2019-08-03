import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAddProject(params) {
  return request('/api/UAT/project/addProject', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddCase(params) {
  return request('/api/UAT/case/addCase', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddSubFolder(params) {
  return request('/api/UAT/case/addSubFolder', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddCustomKeyword(params) {
  return request('/api/UAT/case/addCustomKeyword', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddCaseStep(params) {
  return request('/api/UAT/case/addCaseStep', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteStep(params) {
  return request('/api/UAT/case/deleteStep', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskDelete(params) {
  return request('/api/UAT/task/taskDelete', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskExcute(params) {
  return request('/api/UAT/task/taskExcute', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteGlobalValues(params) {
  return request('/api/UAT/project/deleteGlobalValues', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteGlobalFile(params) {
  return request('/api/UAT/project/deleteGlobalFile', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateGlobalValues(params) {
  return request('/api/UAT/project/updateGlobalValues', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddProxyConfig(params) {
  return request('/api/UAT/project/addProxyConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryInsertStep(params) {
  return request('/api/UAT/case/insertStep', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateProjectLibConfig(params) {
  return request('/api/UAT/case/updateProjectLibConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateCaseStep(params) {
  return request('/api/UAT/case/updateCaseStep', {
    method: 'POST',
    data: params,
  });
}

export async function queryCopyCase(params) {
  return request('/api/UAT/case/copyCase', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteFolder(params) {
  return request('/api/UAT/case/deleteFolder', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteCase(params) {
  return request('/api/UAT/case/deleteCase', {
    method: 'POST',
    data: params,
  });
}

export async function queryDragStep(params) {
  return request('/api/UAT/case/dragStep', {
    method: 'POST',
    data: params,
  });
}

export async function querySearchKeywords(params) {
  return request('/api/UAT/case/searchKeywords', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddStepIndexDesc(params) {
  return request('/api/UAT/case/addStepIndexDesc', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddDebugTask(params) {
  return request('/api/UAT/case/addDebugTask', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteStepIndexDesc(params) {
  return request('/api/UAT/case/deleteStepIndexDesc', {
    method: 'POST',
    data: params,
  });
}

export async function queryDeleteProxyConfig(params) {
  return request('/api/UAT/project/deleteProxyConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryGetStepIndexDesc(params) {
  return request('/api/UAT/case/getStepIndexDesc', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateKeywordInfo(params) {
  return request('/api/UAT/case/updateKeywordInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateCaseInfo(params) {
  return request('/api/UAT/case/updateCaseInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryUploadTreeName(params) {
  return request('/api/UAT/case/uploadTreeName', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateStepIndexDesc(params) {
  return request('/api/UAT/case/updateStepIndexDesc', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskList(params) {
  return request('/api/UAT/task/taskList', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddTask(params) {
  return request('/api/UAT/task/addTask', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateTask(params) {
  return request('/api/UAT/task/updateTask', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateTaskStatus(params) {
  return request('/api/UAT/task/updateTaskStatus', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskReportByDate(params) {
  return request('/api/UAT/task/taskReportByDate', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddGlobalValues(params) {
  return request('/api/UAT/project/addGlobalValues', {
    method: 'POST',
    data: params,
  });
}

export async function queryAddGlobalFile(params) {
  return request('/api/UAT/project/addGlobalFile', {
    method: 'POST',
    data: params,
  });
}

export async function querySetProjectStatus(params) {
  return request('/api/UAT/project/setProjectStatus', {
    method: 'POST',
    data: params,
  });
}
export async function queryAddProjectVersion(params) {
  return request('/api/UAT/project/addProjectVersion', {
    method: 'POST',
    data: params,
  });
}
export async function querySetVersionStatus(params) {
  return request('/api/UAT/project/setProjectVersionStatus', {
    method: 'POST',
    data: params,
  });
}
export async function queryUpdateVersion(params) {
  return request('/api/UAT/project/updateVersion', {
    method: 'POST',
    data: params,
  });
}

export async function querySetUserStatus(params) {
  return request('/api/UAT/project/setUserStatus', {
    method: 'POST',
    data: params,
  });
}

export async function querySetUserType(params) {
  return request('/api/UAT/project/setUserType', {
    method: 'POST',
    data: params,
  });
}

export async function queryUpdateKeywords(params) {
  return request('/api/UAT/project/updateKeywords', {
    method: 'POST',
    data: params,
  });
}

export async function queryLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryRegister(params) {
  return request('/api/auth/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseData(params) {
  return request(`/api/UAT/case/caseData?caseId=${params.caseId.toString()}&versionId=${params.versionId ? params.versionId.toString() : ''}&_=${new Date().getTime().toString()}`);
}

export async function queryProxyConfigList() {
  return request(`/api/UAT/project/proxyConfigList?_=${new Date().getTime().toString()}`);
}

export async function queryUserList() {
  return request(`/api/UAT/project/userList?_=${new Date().getTime().toString()}`);
}

export async function queryHomeData() {
  return request(`/api/UAT/task/getHomeData?_=${new Date().getTime().toString()}`);
}

export async function queryHomeFailCase() {
  return request(`/api/UAT/task/getHomeFailCase?_=${new Date().getTime().toString()}`);
}

export async function queryLogout() {
  return request(`/api/auth/logout?_=${new Date().getTime().toString()}`);
}

export async function queryGetHomeBack() {
  return request(`/api/auth/getHomeBack?_=${new Date().getTime().toString()}`);
}

export async function queryProjectGlobalValues(params) {
  return request(`/api/UAT/project/projectGlobalValues?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryGetLibKeywords(params) {
  return request(`/api/UAT/project/getLibKeywords?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryGetKeywordInfo(params) {
  return request(`/api/UAT/case/getKeywordInfo?caseId=${params.caseId.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryTreeList(params) {
  return request(`/api/UAT/case/treeList?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryTaskReport(params) {
  return request(`/api/UAT/task/taskReport?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryTaskInfo(params) {
  return request(`/api/UAT/task/taskInfo?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryCaseTreeList(params) {
  return request(`/api/UAT/case/caseTreeList?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryCaseProjectConfig(params) {
  return request(`/api/UAT/case/caseProjectConfig?id=${params.id.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryProjectList(params) {
  return request(`/api/UAT/project/projectList?status=${params.status.toString()}&_=${new Date().getTime().toString()}`);
}
export async function queryProjectVersionList(params) {
  return request(`/api/UAT/project/projectVersionList?status=${params.status.toString()}&projectId=${params.projectId.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryGetLibs(params) {
  return request(`/api/UAT/case/getLibs?status=${params.status.toString()}&_=${new Date().getTime().toString()}`);
}

export async function queryGetAllLibs(params) {
  return request(`/api/UAT/project/getAllLibs?status=${params.status.toString()}&_=${new Date().getTime().toString()}`);
}
