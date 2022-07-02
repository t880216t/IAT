import request from 'umi-request';

export async function queryTaskList(params) {
  return request('/api/api_v3/task/taskList', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskInfo(params) {
  return request('/api/api_v3/task/taskInfo', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskCaseList(params) {
  return request('/api/api_v3/task/taskCaseList', {
    method: 'POST',
    data: params,
  });
}
