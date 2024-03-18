
import hookStore from '@/store/hookStore';
import { setRouteInfo } from '@/libs/routeMethod';
import { useLocation, matchRoutes } from 'react-router-dom';
import { useMemo } from 'react';
export const useRouteInfo = () => {
  const { pathname } = useLocation()
  const routeInfos = useMemo(() => {
    return setRouteInfo(matchRoutes(hookStore.getState().dynamicRoutes, pathname))
  }, [pathname])
  return {
    routeInfos,
    pathname
  }
}