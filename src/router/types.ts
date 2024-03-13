export interface routeMatchType {
  path: string,
  meta: {
    title: string,
    affix?: boolean,
    hideInTag?: boolean
  }
}

export interface RouteMetaModel {
  hideInMenu?: boolean,
  icon?: string | undefined,
  title: string | undefined,
  affix?: boolean
  unAuth?: boolean,
  hadeInTag?: boolean
}

export interface RouteResultModel {
  id?: number,
  pid?: number,
  path: string,
  meta?: RouteMetaModel | undefined,
  element: string,
  redirect?: string | undefined,
  children?: RouteResultModel[]
}