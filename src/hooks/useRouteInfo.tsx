
import routeStore from '@/store/routeStore';
import { setRouteInfo } from '@/libs/routeMethod';
import { useLocation, matchRoutes } from 'react-router-dom';
import { layoutRoutes, NotFount, otherRoutes } from "@/router/routes";
import { useMemo } from 'react';
// 获取路由信息
export const useRouteInfo = () => {
  const { pathname } = useLocation()
  const dynamicRoutes = routeStore.use.dynamicRoutes()
  const routeInfos = useMemo(() => {
    // 如果动态路由未获取到，就用本地路由
    const routesMatch = dynamicRoutes.length && dynamicRoutes
    return setRouteInfo(matchRoutes(routesMatch || [
      ...layoutRoutes(otherRoutes),
      ...NotFount
    ], pathname)) || []
  }, [pathname, dynamicRoutes])
  return {
    routeInfos,
    pathname
  }
}