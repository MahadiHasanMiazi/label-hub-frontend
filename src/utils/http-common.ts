import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  getUserFromLocalStorage,
  updateLocalStorageToken,
} from "./localStorage";
const REFRESH_TOKEN_URL = "api/v1/refresh/access-token";

const http = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVICE_URL,
});

export const customFetch = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVICE_URL,
});
export const projectCustomFetch = axios.create({
  baseURL: process.env.REACT_APP_PROJECT_SERVICE_URL,
});
export const nerCustomFetch = axios.create({
  baseURL: process.env.REACT_APP_NER_SERVICE_URL,
});

export const projectServiceDevelopment = axios.create({
  baseURL: process.env.REACT_APP_PROJECT_SERVICE_DEVELOPMENT_URL,
});

customFetch.interceptors.request.use(
  async (config: any) => {
    const token = await getUserFromLocalStorage();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    var token = getUserFromLocalStorage();
    const currentDate = new Date();
    let { exp }: any = jwt_decode(token.refresh_token);
    if (exp * 1000 < currentDate.getTime()) {
      localStorage.clear();
      window.location.href = process.env.REACT_APP_LOGIN_URL;
    }
    let originalConfig = err.config;
    if (err.response) {
      if (
        (err.response.status > 400 || err.response.status <= 500) &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          const res = await customFetch.post(REFRESH_TOKEN_URL, {
            refresh_token: token.refresh_token,
          });
          updateLocalStorageToken(res.data);
          return customFetch(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

projectCustomFetch.interceptors.request.use(
  async (config: any) => {
    const token = await getUserFromLocalStorage();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

projectCustomFetch.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    var tokenData = getUserFromLocalStorage();

    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        try {
          const res = await customFetch.post(REFRESH_TOKEN_URL, {
            refresh_token: tokenData.refresh_token,
          });
          updateLocalStorageToken(res.data);
          return customFetch(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
nerCustomFetch.interceptors.request.use(
  async (config: any) => {
    const token = await getUserFromLocalStorage();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

nerCustomFetch.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    var tokenData = getUserFromLocalStorage();

    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        try {
          const res = await customFetch.post(REFRESH_TOKEN_URL, {
            refresh_token: tokenData.refresh_token,
          });
          updateLocalStorageToken(res.data);
          return customFetch(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default http;
