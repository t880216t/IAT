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

export async function queryTasktAdd(params) {
  return request('/api/api_v3/task/taskAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskDel(params) {
  return request('/api/api_v3/task/taskDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskCopy(params) {
  return request('/api/api_v3/task/taskCopy', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskUpdate(params) {
  return request('/api/api_v3/task/taskUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryTaskExec(params) {
  return request('/api/api_v3/task/taskExec', {
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
