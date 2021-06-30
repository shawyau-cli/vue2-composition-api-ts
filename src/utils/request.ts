/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from 'element-ui';
import { removeNullOrEmpty } from '@/utils/utils';
const appConfig = require('../config/app.config');

export interface StringDictionary {
  [key: number]: string;
}

export interface ResponseError {
  code: number;
  message: string;
}

export interface ResponseData {
  success: boolean;
  error?: ResponseError;
  data?: any;
}

const customCodeMessage: StringDictionary = {
  401: '账号未登录', // 未登陆
};

const serverCodeMessage: StringDictionary = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response, msg } = error;
  if (msg === 'CustomError') {
    // 自定义错误
    const { config, data } = response;
    const { url, baseURL } = config;
    const {
      success,
      error: { code, message },
    } = data;
    const reqUrl = url.split('?')[0].replace(baseURL, '');
    const noVerifyBool = appConfig.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool && !success) {
      Message.error(customCodeMessage[code] || message || 'Error');

      if (code === 401) {
        // 跳转登录
        // router.replace('/user/login');
      }
    }
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    Message.error(`请求错误 ${status}: ${request.responseURL}\r\n${errorText}`);
  } else if (!response) {
    Message.error('您的网络发生异常，无法连接服务器');
  }

  return Promise.reject(error);
};

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
  // baseURL: process.env.VUE_APP_APIHOST,
  withCredentials: true,
  timeout: 0, // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

request.defaults.headers.post['Content-Type'] = 'application/json';

request.interceptors.request.use(
  async (config: AxiosRequestConfig & { cType?: boolean }) => {
    if (config.data) {
      config.data = removeNullOrEmpty(config.data);
    }
    if (config.params) {
      config.params = removeNullOrEmpty(config.params);
    }
    if (config['cType']) {
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8';
    }

    // 自定义添加token header
    const headerToken = window.localStorage.getItem(appConfig.siteTokenKey);
    if (headerToken) {
      config.headers[appConfig.ajaxHeadersTokenKey] = headerToken;
    }

    return config;
  },
);

/**
 * 请求后
 * 响应拦截器
 */
request.interceptors.response.use(async (response: AxiosResponse) => {
  const res: ResponseData = response.data;
  const { success } = res;

  // 自定义状态码验证
  if (!success) {
    return Promise.reject({
      response,
      msg: 'CustomError',
    });
  }

  return response;
});

export default function (config: AxiosRequestConfig): AxiosPromise<any> {
  return request(config)
    .then((response: AxiosResponse) => response.data)
    .catch((error) => errorHandler(error));
}
