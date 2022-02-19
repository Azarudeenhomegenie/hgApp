import axios from 'axios';
import { BASE_URL } from '@constants/app';

// export function ApiClient() {
//   const client = axios.create({ baseURL: BASE_URL });

//   client.interceptors.request.use(async (config) => {

//     const { state: { isLoggedIn, token } } = store.getState();
//     if (isLoggedIn && token !== null) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//       if (config.headers.hasOwnProperty('Authorization')){
//         delete config.headers.Authorization;
//       }
//     } 
//     return config;
//   });

//   client.interceptors.response.use(
//     (response) => {
//       return response.data.data;
//     },
//     (error) => {
//       console.log(error);
//       return Promise.reject(error);
//     },
//   );

//   client.setToken = (token) => {
//     axios.defaults.headers.common["Authorization"] = `Bearer${token}`;

//   }

//   return client;
// }


// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(`${BASE_URL}${endpoint}`, config)
    data = await response.json()
    if (response.ok) {
      return data.data
    }
    throw new Error(response.statusText)
  } catch (err) {
    console.log(error);
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

