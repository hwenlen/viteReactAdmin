import { create } from "zustand";
import { createSelectors } from "./utils/createSelector";
import type { NavigateFunction, RouteObject } from 'react-router-dom'
interface RouteStoreState {
  navigate: NavigateFunction | null,
  dynamicRoutes: RouteObject[]
}

const routeStore = createSelectors(create<RouteStoreState>()(
  () => {
    return {
      navigate: null,
      dynamicRoutes: []
    }
  }
))

export const setNavigate = (useNav: NavigateFunction) => {
  routeStore.setState({
    navigate: useNav
  })
}

export default routeStore