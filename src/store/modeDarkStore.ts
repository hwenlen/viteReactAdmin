import { create } from "zustand";
import { createSelectors } from "./utils/createSelector";
import { immer } from "zustand/middleware/immer";

interface modeDarkState {
  modeDark: string
}

const isDark = localStorage.getItem('isDark') || 'light'
const modeDarkStore = createSelectors(create<modeDarkState>()(
  // 引入immer后将原来的函数作为参数导入
  immer(
    () => {
      return {
        modeDark: isDark
      }
    }
  )
))

export const toggleDark = () => {
  modeDarkStore.setState((state) => {
    state.modeDark = state.modeDark == 'light' ? 'dark' : 'light'
    localStorage.setItem('isDark', state.modeDark)
  })
}

export default modeDarkStore