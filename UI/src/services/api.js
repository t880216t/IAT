import { stringify } from 'qs';
import request from '@/utils/request';

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

export async function queryLogout() {
  return request(`/api/auth/logout?_=${new Date().getTime().toString()}`);
}

export async function queryGetHomeBack() {
  return request(`/api/auth/getHomeBack?_=${new Date().getTime().toString()}`);
}
