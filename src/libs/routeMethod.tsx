import { RouteResultModel } from "@/router/types"
import { Navigate } from "react-router-dom";
import { lazyLoad } from "@/router/routes";
import { ComponentType } from "react"
/**
 * @param {*} match matchRoutes获取的路由信息
 * @description 获取tag和面包屑所需的route信息
 * @return 用到的route信息
 */
export const setRouteInfo = (matchs: any) => {
  if (!matchs || matchs.length == 0) return null
  return matchs.map((item: any) => {
    return {
      path: item.route.path,
      pathname: item.pathname,
      meta: {
        title: item.route.meta?.title,
        affix: item.route.meta?.affix,
        hideInTag: item.route.meta?.hideInTag
      }
    }
  })
}

/**
 * @param {Array} data 后端返回的路由数据
 * @description 将后端返回的路由数据做成符合router的格式
 * @return {string} routes
 */
export function formatRouterTree(data: RouteResultModel[]) {
  const parents = data.filter(item => item.pid === 0)
  const children = data.filter(item => item.pid !== 0)
  const navigateRoutes: RouteResultModel[] = []

  dataToTree(parents, children)
  function dataToTree(parents: RouteResultModel[], children: RouteResultModel[]) {
    parents.map(parent => {
      if (parent.redirect) {
        const redt = {
          path: parent.path,
          element: 'Navigate',
          redirect: parent.redirect
        }
        navigateRoutes.push(redt)
      }
      children.map((child, i) => {
        const _child = JSON.parse(JSON.stringify(children))
        if (child.pid === parent.id) {
          _child.splice(i, 1)
          dataToTree([child], _child)
          if (parent.children) {
            parent.children.push(child)
          } else {
            parent.children = [child]
          }
        }
      })
    })
  }
  return [...navigateRoutes, ...parents]
}

/**
 * @param {Array} view router组件
 * @description 将R
 * @return {string} 获取组件
 */
const modules = import.meta.glob('../views/**/*.tsx')
export const loadView = (view: string) => { // 路由懒加载
  return modules[`../views/${view}/index.tsx`]
}
/**
 * @param {Array} userRouters 后端返回的经过formatRouterTree处理过后的routes
 * @description 将数据转化为router数据
 * @return {string} routes
 */
export function generateRouter(userRouters: RouteResultModel[], Layout: JSX.Element) {
  const newRoutes = userRouters.map(item => {
    let el: JSX.Element;
    let route: RouteResultModel;
    if (item.element) {
      switch (item.element) {
        case 'Layout':
          el = Layout
          break;
        case 'Navigate':
          el = <Navigate replace to={item.redirect!} />
          break;
        default:
          el = lazyLoad(loadView(item.element) as () => Promise<{ default: ComponentType<any>; }>)
          break;
      }
      route = {
        path: item.path,
        meta: item.meta,
        children: item.children,
        element: el
      } as unknown as RouteResultModel
    } else {
      route = {
        path: item.path,
        meta: item.meta,
        children: item.children
      } as unknown as RouteResultModel
    }

    if (item.children && item.children.length > 0) {
      route.redirect = item.redirect ? item.redirect : undefined
      route.children = generateRouter(item.children, Layout)
    }
    return route
  })

  return newRoutes
}