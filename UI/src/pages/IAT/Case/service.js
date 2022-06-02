import request from 'umi-request';

export async function queryProjectTreeData(params) {
  return request('/api/api_v3/case/treeData', {
    method: 'POST',
    data: params,
  });
}

export async function queryModuleAdd(params) {
  return request('/api/api_v3/case/moduleAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryModuleCopy(params) {
  return request('/api/api_v3/case/moduleCopy', {
    method: 'POST',
    data: params,
  });
}

export async function queryModuleDel(params) {
  return request('/api/api_v3/case/moduleDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryModuleUpdate(params) {
  return request('/api/api_v3/case/moduleUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseList(params) {
  return request('/api/api_v3/case/caseList', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseAdd(params) {
  return request('/api/api_v3/case/caseAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseCopy(params) {
  return request('/api/api_v3/case/caseCopy', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseDelete(params) {
  return request('/api/api_v3/case/caseDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseMove(params) {
  return request('/api/api_v3/case/caseMove', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaseInfo(params) {
  return request('/api/api_v3/case/caseInfo', {
    method: 'POST',
    data: params,
  });
}
