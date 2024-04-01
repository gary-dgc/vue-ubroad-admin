import Cookie from 'js-cookie';
import eventBus from '@/utils/bus.js';

// 401拦截
const resp401 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const { message } = options;
    if (response && response.code === 401) {
      message.error('无此权限');
    }
    return response;
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (response && response.status === 401) {
      message.error('无此权限');
    }
    return Promise.reject(error);
  },
};

const resp403 = {
  onFulfilled(response, options) {
    const { message } = options;
    if (response && response.code === 403) {
      message.error('请求被拒绝');
    }
    return response;
  },
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (response && response.status === 403) {
      message.error('请求被拒绝');
    }
    return Promise.reject(error);
  },
};

/**
 * inteceptor for response result
 **/
const respResult = {
  onFulfilled(response) {
    const result = response.data;
    return result;
  },
  onRejected(error, options) {
    const { message } = options;
    if (error.response) {
      // The client was given an error response (5xx, 4xx)
    } else if (error.request) {
      // The client never received a response, and the request was never left
      message.error('网络访问异常，服务无法访问');
    } else {
      // Anything else
      message.error(error.message);
    }
    return Promise.reject(error);
  },
};

const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const { message } = options;
    const { url, xsrfCookieName } = config;
    if (config.open_api) {
      // 如果open_api那么直接放行
      return config;
    }
    if (url.indexOf('sign-in') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('认证 token 已过期，请重新登录');
      eventBus.emit('show:relogin'); // 触发消息总线消息
    }
    return config;
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options;
    message.error(error.message);
    return Promise.reject(error);
  },
};

export default {
  request: [reqCommon], // 请求拦截
  response: [resp401, resp403, respResult], // 响应拦截
};
