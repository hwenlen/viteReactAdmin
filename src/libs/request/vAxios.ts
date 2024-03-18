import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ResponseData } from './types'
import routeStore from '@/store/routeStore';

// 定义返回数据类型，继承AxiosResponse，可扩展
export default class VAxios {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    this.setInterceptors();
  }
  // 设置拦截器
  private setInterceptors() {
    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use(function (config) {
      //支持跨域传递cookie
      config.withCredentials = true;
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      const { data } = response
      const navigate = routeStore.getState().navigate
      if (data && data.code && data.code == 401) {
        navigate && navigate('/login')
      }

      return data
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.axiosInstance({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.axiosInstance({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.axiosInstance({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.axiosInstance({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.axiosInstance({ ...config });
  }
}