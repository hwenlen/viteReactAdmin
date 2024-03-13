import Axios from '@/libs/request'
import { LoginParams, LoginResultModel } from './type'
import { RouteResultModel } from '@/router/types'

export const LoginIn = (params: LoginParams) => {
  return Axios.post<LoginResultModel>({
    url: '/api/login',
    params
  })
}

export const LoginOut = () => {
  return Axios.post({
    url: '/api/loginout'
  })
}

export const getRoutes = (params: { uid: number | null }) => {
  return Axios.post<RouteResultModel[]>({
    url: '/api/routes',
    params
  })
}