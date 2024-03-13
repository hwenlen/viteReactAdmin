export interface tableListParams extends listParams {
  turnover: string;
  type: number | string;
  name: string
}

export interface typeModel {
  value: number,
  name: string
}

export interface tableItemResultModel {
  id: number,
  name: string,
  type: number,
  typeText: string,
  img: string,
  createTime: string,
  turnover: string,
  address: string
}

export interface tableListResultModel {
  list: tableItemResultModel[],
  total: number
}