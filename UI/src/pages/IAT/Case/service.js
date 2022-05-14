import request from 'umi-request';

export async function queryProjectTreeData(params) {
  return request('/api/UAT/case/caseTreeData', {
    method: 'POST',
    data: params,
  });
}
