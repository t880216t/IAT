import request from 'umi-request';

export async function queryProjectList(params) {
  return request('/api/api_v3/project/projectList', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectListPre(params) {
  return request('/api/api_v3/project/projectListPre', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectAdd(params) {
  return request('/api/api_v3/project/projectAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectDel(params) {
  return request('/api/api_v3/project/projectDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectUpdate(params) {
  return request('/api/api_v3/project/projectUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectEnvList(params) {
  return request('/api/api_v3/project/projectEnvList', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectEnvUpdate(params) {
  return request('/api/api_v3/project/projectEnvUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectEnvAdd(params) {
  return request('/api/api_v3/project/projectEnvAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectEnvCopy(params) {
  return request('/api/api_v3/project/projectEnvCopy', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectEnvDel(params) {
  return request('/api/api_v3/project/projectEnvDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvRequestConfig(params) {
  return request('/api/api_v3/project/envRequestConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvRequestConfigUpdate(params) {
  return request('/api/api_v3/project/envRequestConfigUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvReqHeaderConfig(params) {
  return request('/api/api_v3/project/envReqHeaderConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvReqHeaderConfigAdd(params) {
  return request('/api/api_v3/project/envReqHeaderConfigAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvReqHeaderConfigDel(params) {
  return request('/api/api_v3/project/envReqHeaderConfigDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvReqHeaderConfigUpdate(params) {
  return request('/api/api_v3/project/envReqHeaderConfigUpdate', {
    method: 'POST',
    data: params,
  });
}


export async function queryEnvParamsConfig(params) {
  return request('/api/api_v3/project/envParamsConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvParamsConfigAdd(params) {
  return request('/api/api_v3/project/envParamsConfigAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvParamsConfigDel(params) {
  return request('/api/api_v3/project/envParamsConfigDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvParamsConfigUpdate(params) {
  return request('/api/api_v3/project/envParamsConfigUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvHostConfig(params) {
  return request('/api/api_v3/project/envHostConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvHostConfigAdd(params) {
  return request('/api/api_v3/project/envHostConfigAdd', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvHostConfigDel(params) {
  return request('/api/api_v3/project/envHostConfigDel', {
    method: 'POST',
    data: params,
  });
}

export async function queryEnvHostConfigUpdate(params) {
  return request('/api/api_v3/project/envHostConfigUpdate', {
    method: 'POST',
    data: params,
  });
}
