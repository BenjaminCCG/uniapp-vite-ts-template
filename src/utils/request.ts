import { isDevelopment, isH5 } from './platform';
import { forward } from './router';
import { getCommonParams } from '@/config/commonParams';
import env from '@/config/env';
import { hideLoading, showLoading } from '@/config/serviceLoading';

function reject(err: { code?: number; message?: string }) {
  const { message = '服务器异常！', code = 0 } = err;
  switch (code) {
    case 401:
      // 特殊异常处理
      forward('login');
      break;

    default:
      uni.showToast({
        title: message
      });
      break;
  }
}
export interface ResponseData<T> {
  code: number;
  message: string;
  data: T | null;
}
// h5环境开启代理
const apiBaseUrl = isH5 && isDevelopment ? '/api' : env.apiBaseUrl;

function baseRequest(
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined,
  url: string,
  data: { isLoading: any }
) {
  return new Promise((resolve) => {
    showLoading(data.isLoading);
    delete data.isLoading;
    let responseData: unknown;
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        'content-type': method === 'GET' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded'
      },
      data,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          const result = res.data as ResponseData<any>;
          if (result.data === 200) {
            responseData = res.data;
          } else {
            reject(result);
          }
        } else {
          reject({
            code: 0,
            message: '服务器异常！'
          });
        }
      },
      fail: () => {
        reject({
          code: 0,
          message: '服务器异常！'
        });
      },
      complete: (data) => {
        console.log(data, 'data');
        resolve(responseData);
        hideLoading();
      }
    });
  });
}

const http = {
  get: <U, T>(api: string, params: U) =>
    baseRequest('GET', api, {
      ...getCommonParams(),
      ...params
    }) as T,
  post: <U, T>(api: string, params: U) =>
    baseRequest('POST', api, {
      ...getCommonParams(),
      ...params
    }) as T
};

export default http;
