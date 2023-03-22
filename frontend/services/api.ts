import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getCsrfToken(cookieString: string): string | undefined {
  const tokenCookie = cookieString
    .split(/, |; /)
    .find((cookie) => cookie.startsWith('csrftoken='));

  if (!tokenCookie) {
    return undefined;
  }
  const tokenValue = tokenCookie.split('=')[1];

  return tokenValue;
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

    const CSRFTokenString =
      (await AsyncStorage.getItem('csrfmiddlewaretoken')) || '';

    const CSRFToken = CSRFTokenString.substring(1, CSRFTokenString.length - 1);

    if (CSRFToken) {
      newConfig.headers['X-CSRFToken'] = getCsrfToken(CSRFToken);
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
