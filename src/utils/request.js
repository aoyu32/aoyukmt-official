// http.js - 修改后的axios实例

import axios from 'axios';
// 移除了antd的message引入

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:8080/web', // 从环境变量获取基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  }
});

// // 请求拦截器
// instance.interceptors.request.use(
//   config => {
//     // 在发送请求之前做些什么
//     // 例如：获取并设置token
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     // 对请求错误做些什么
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 如果是文件流响应，直接返回整个响应对象
    if (response.config.responseType === 'blob') {
      return response;
    }

    // 对 JSON 响应数据做处理
    const { data } = response;
    console.log("服务端响应：", data);
    if (data.code === 0 || data.code === 200) {
      return data.data; // 直接返回数据部分
    } else {
      // 将完整的错误信息传递给组件，不在拦截器中显示错误提示
      return Promise.reject({
        message: data.message || '请求失败!',
      });
    }
  },
  error => {
    // 对响应错误做点什么
    let errorMessage = '网络错误，请稍后重试';
    let statusCode = null;
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      const { status } = error.response;
      statusCode = status;

      switch (status) {
        case 401:
          errorMessage = '未授权，请重新登录';
          // 可以在这里处理登出逻辑
          localStorage.removeItem('token');
          // 但不进行自动跳转，让组件决定如何处理
          break;
        case 403:
          errorMessage = '拒绝访问';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器错误';
          break;
        default:
          errorMessage = `请求错误 (${status})`;
      }
    } else if (error.request) {
      errorMessage = '网络连接出错，请检测网络！';
    }

    const enhancedError = {
      ...error,
      statusCode,
      message: errorMessage,
      isHttpError: true // 标记这是HTTP错误而非业务错误
    };
    console.error('Response error:', enhancedError);
    return Promise.reject(enhancedError);
  }
);
export default instance;