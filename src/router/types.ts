import type { RouteObject } from "react-router-dom";

export interface RouteMetaModel {
  hideInMenu?: boolean,
  icon?: string | undefined,
  title: string | undefined,
  affix?: boolean
  Auth?: string,
  hideInTag?: boolean
}
export interface routeMatchType {
  path: string,
  pathname: string,
  meta: RouteMetaModel
}

export interface RouteResultModel {
  id?: number,
  pid?: number,
  path: string,
  fullpath?: string;
  meta?: RouteMetaModel | undefined,
  element: string,
  redirect?: string | undefined,
  children?: RouteResultModel[]
}

export interface RouteCusModel {
  path: string,
  meta?: RouteMetaModel,
  element: JSX.Element,
  children?: RouteCusModel[]
}

export type RoutesCustomModel = RouteObject | RouteCusModel