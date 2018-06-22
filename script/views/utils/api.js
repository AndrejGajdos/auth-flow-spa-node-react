import axios from 'axios';
import { API_ADDRESS } from 'config';

export function get(path, params) {
  const url = `${API_ADDRESS}${path}`;

  return axios({
    method: 'get',
    url,
    params,
    withCredentials: true,
  }).then(resp => resp.data);
}

export function post(path, data, params) {
  const url = `${API_ADDRESS}${path}`;

  return axios({
    method: 'post',
    url,
    data,
    params,
    withCredentials: true,
  });
}
