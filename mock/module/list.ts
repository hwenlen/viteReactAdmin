import Mock from 'mockjs';
import { filterData } from '../_util'

const tableTypes = [
  { value: 1, name: '护士订单' },
  { value: 2, name: '护理员订单' },
  { value: 3, name: '商品订单' },
  { value: 4, name: '护工订单' },
  { value: 5, name: '平台订单' },
  { value: 6, name: '设备订单' },
]
const types = tableTypes.map((i: any) => i.value)
const typeTexts = tableTypes.map((i: any) => i.name)
const tableList = Mock.mock({
  "list|99": [
    {
      "id|+1": 1,
      "name": "@cname",
      "type|+1": types,
      "typeText|+1": typeTexts,
      "img": "@image('200x200', '#894FC4', '#FFF', 'png', '!')",
      "createTime": "@datetime",
      "turnover": /^[a-zA-Z0-9]{18}$/,
      "address": "@county(true)"
    }
  ]
})



export default [
  {
    method: "get",
    url: "/api/orderTypes",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: tableTypes
      };
    }
  },
  {
    method: "post",
    url: "/api/fundincomeList",
    response: (config: any) => {
      const { pageSize, pageNum } = config.query
      // 筛选
      const list = filterData(config.query, tableList.list)
      const total = list.length
      // 分页
      const laseList = list.splice((pageNum - 1) * pageSize, pageSize)
      return {
        code: 200,
        message: "success",
        data: {
          list: laseList,
          total: total
        }
      };
    }
  }
]