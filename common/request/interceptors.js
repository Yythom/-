import {
  setStorageSync, showToast, login, getStorageSync, getCurrentPages, reLaunch,
} from '@tarojs/taro';
import { logInterceptor, timeoutInterceptor } from './interceptor/interceptors';
import http from './index';
import getBaseUrl from './baseURL';
import { newWorkStackPush } from '../../utils/wx-net_error';

const baseURL = getBaseUrl();
const customInterceptor = (chain) => {
  const { requestParams } = chain;
  const { url, data } = requestParams; // 本次请求的url

  return chain.proceed(requestParams).then(async (res) => {
    let prevUrl = '';
    let prevData = null;

    // 当请求成功
    const { code, msg } = res.data;
    const result = res.data.data
    // TODO:当code为0，表示请求成功
    if (code != '0') {
      if (msg) {
        if (msg.indexOf('登录') !== -1) {
          setTimeout(() => {
            reLaunch({ url: '/pages/center/index' });
          }, 1000);
          setStorageSync('relogin', true)
        }
        console.log(msg, 'error');
        showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      }
      // 网络监控加入stack
      newWorkStackPush('success', 'error', res.data.code, requestParams, res.data);
      return Promise.resolve(false);
    } else { // 请求成功时
      return Promise.resolve(result);
    }
    // return Promise.reject();
  }).catch(err => {
    showToast({
      title: '服务器错误：' + err.errMsg,
      icon: 'none',
      duration: 2000
    })
    // 网络监控加入stack
    newWorkStackPush('error', 'error', '服务器错误：' + err.errMsg, requestParams);
  });
};

const interceptors = [customInterceptor, logInterceptor, timeoutInterceptor];

export default interceptors;
