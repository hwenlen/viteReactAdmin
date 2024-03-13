import { create } from "zustand";
import { routeMatchType } from "@/router/types";
import { homeMatch } from "@/router/routes";

interface menuStoreState<T> {
  tagNavList: Array<T>,
  tagNavReset: () => void,
  addNavTag: (route: routeMatchType) => void,
  delNavTag: (type: string, name: string) => void,
  getToRouteName: (name: string) => string
}

export const menuStore = create<menuStoreState<routeMatchType>>()(
  (set, get) => {
    return {
      tagNavList: [], // 顶部标签栏数据
      tagNavReset() {
        this.tagNavList = []
      },
      // 添加tag
      addNavTag(route: routeMatchType | null) {
        if (!route) return
        if (get().tagNavList.some((v) => v.path === route.path)) return

        if (!get().tagNavList[0]?.meta?.affix) {
          set({
            tagNavList: [homeMatch]
          })
        }
        // hadeInTag: 是否显示在nav上
        if (route.meta && !route.meta.hideInTag && !route.meta.affix) {
          set((state) => ({
            tagNavList: [...state.tagNavList, route]
          }))
        }
      },
      // 删除tag
      delNavTag(type: string, pathname: string) {
        if (type == 'single') {
          set((state) => ({
            tagNavList: state.tagNavList.filter((item) => item.path !== pathname)
          }))
        } else if (type == 'all') {
          set((state) => ({
            tagNavList: state.tagNavList.filter(item => item.meta.affix)
          }))
        } else {
          set((state) => ({
            tagNavList: state.tagNavList.filter(item => item.meta.affix || item.path === pathname)
          }))
        }
      },
      // 删除tag后跳转
      getToRouteName(path: string) {
        const tagList = get().tagNavList
        let nm = ''
        // nav是否只有2个标签
        if (tagList.length === 2) {
          // nm = HOME_ROUTE_NAME
          nm = '/home'
        } else {
          // 删除的是否是最后一个
          if (tagList[tagList.length - 1].path == path) nm = tagList[tagList.length - 2].path as string
          // 不是最后一个就获取当前标签的下一个的name
          else nm = tagList[tagList.findIndex((item) => item.path === path) + 1].path as string
        }
        return nm
      }
    }
  }
)