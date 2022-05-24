import request from 'umi-request';

export async function queryTaskList(params) {
  return request('/api/api_v3/task/taskList', {
    method: 'POST',
    data: params,
  });
}
