import { create } from "zustand";
import { createSelectors } from "./utils/createSelector";
import type { NavigateFunction, RouteObject } from 'react-router-dom'
interface HookStoreState {
  navigate: NavigateFunction | null,
  dynamicRoutes: RouteObject[]
}

const hookStore = createSelectors(create<HookStoreState>()(
  () => {
    return {
      navigate: null,
      dynamicRoutes: []
    }
  }
))

export const setNavigate = (useNav: NavigateFunction) => {
  hookStore.setState({
    navigate: useNav
  })
}

export default hookStore