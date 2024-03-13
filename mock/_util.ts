export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
// 多级筛选
export function filterData(obj: any, list: any) {
  const filterKeys = Object.keys(obj)
  return list.filter((item: any) => {
    return filterKeys.every(key => {
      if (!item[key] || !obj[key] || obj[key] === '0') return true
      if (item[key] && typeof item[key] == 'string') {
        return item[key].indexOf(obj[key]) >= 0
      } else {
        return item[key] == obj[key]
      }
    })
  })
}