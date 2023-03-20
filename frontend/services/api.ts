import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

function extractCsrfToken(setCookieHeader: string) {
  const cookies = setCookieHeader.split('; ');

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i].split('=');

    if (cookie[0] === '"csrftoken') {
      return cookie[1];
    }
  }
  return null;
}

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

API.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };

    const CSRFToken = await AsyncStorage.getItem('csrfmiddlewaretoken');

    if (CSRFToken) {
      newConfig.headers['X-CSRFToken'] = extractCsrfToken(CSRFToken);
    }

    if (
      newConfig.headers &&
      newConfig.headers['Content-Type'] === 'multipart/form-data'
    )
      return newConfig;
    if (config.params) {
      newConfig.params = decamelizeKeys(config.params);
    }
    if (config.data) {
      newConfig.data = decamelizeKeys(config.data);
    }
    return newConfig;
  },
  (error) => Promise.reject(camelizeKeys(error)),
);

API.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      response.headers['content-type']?.includes('application/json')
    ) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  (error) => Promise.reject(camelizeKeys(error)),
);

export default API;
