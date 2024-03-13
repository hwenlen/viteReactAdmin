import Axios from '@/libs/request'
import { typeModel, tableListParams, tableListResultModel } from './type'

export const getOrderTypes = () => {
  return Axios.get<typeModel[]>({
    url: '/api/orderTypes'
  })
}

export const getFundincomeList = (params: tableListParams) => {
  return Axios.post<tableListResultModel>({
    url: '/api/fundincomeList',
    params
  })
}