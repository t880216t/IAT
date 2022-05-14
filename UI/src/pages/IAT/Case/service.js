import request from 'umi-request';

export async function queryProjectListPre(params) {
  return request('/api/api_v3/project/projectListPre', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectTreeData(params) {
  return request('/api/api_v3/case/treeData', {
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
