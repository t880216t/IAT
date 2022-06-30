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

export async function queryApiList(params) {
  return request('/api/api_v3/case/apiList', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiAdd(params) {
  return request('/api/api_v3/case/apiAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCopy(params) {
  return request('/api/api_v3/case/apiCopy', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiDelete(params) {
  return request('/api/api_v3/case/apiDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiMove(params) {
  return request('/api/api_v3/case/apiMove', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiInfo(params) {
  return request('/api/api_v3/case/apiInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseInfo(params) {
  return request('/api/api_v3/case/apiCaseInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseList(params) {
  return request('/api/api_v3/case/apiCaseList', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseAdd(params) {
  return request('/api/api_v3/case/apiCaseAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseInfoUpdate(params) {
  return request('/api/api_v3/case/apiCaseInfoUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseTags(params) {
  return request('/api/api_v3/case/apiCaseTags', {
    method: 'GET',
    data: params,
  });
}

export async function queryApiCaseMake(params) {
  return request('/api/api_v3/case/apiCaseMake', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseCopy(params) {
  return request('/api/api_v3/case/apiCaseCopy', {
    method: 'POST',
    data: params,
  });
}

export async function queryApiCaseDelete(params) {
  return request('/api/api_v3/case/apiCaseDel', {
    method: 'POST',
    data: params,
  });
}
