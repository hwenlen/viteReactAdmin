
import { routes } from '@/router';
import { setRouteInfo } from '@/libs/routeMethod';
import { useLocation, matchRoutes } from 'react-router-dom';
export const useRouteInfo = () => {
  const { pathname } = useLocation()
  const routeInfos = setRouteInfo(matchRoutes(routes, pathname))
  return {
    routeInfos,
    pathname
  }
}