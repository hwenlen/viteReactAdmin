
import { routes } from '@/router/routes';
import { setRouteInfo } from '@/libs/routeMethod';
import { useLocation, matchRoutes } from 'react-router-dom';
import { useMemo } from 'react';
export const useRouteInfo = () => {
  const { pathname } = useLocation()
  const routeInfos = useMemo(() => {
    return setRouteInfo(matchRoutes(routes, pathname))
  }, [pathname])

  return {
    routeInfos,
    pathname
  }
}