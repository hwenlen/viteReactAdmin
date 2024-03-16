import { userStore } from '@/store/userStore'
import { useEffect, useState } from 'react'
import { menuResultModel } from "@/apis/user/type";
import { getMenus } from '@/apis/user'

export const handleMenus = (menus: menuResultModel[]) => {
  return menus.map(menu => {
    menu.icon = <i className={`iconfont ${menu.icon}`}> </i>
    if (menu.children && menu.children.length > 0) {
      handleMenus(menu.children)
    }
    return menu
  })
}
export function useMenus() {
  const [menuList, setMenuList] = useState<menuResultModel[]>([])
  const userId = userStore.use.userId()
  useEffect(() => {
    if (!userId) return;
    async function createMenuList() {
      const res = await getMenus({ uid: userId })
      if (res.code == 200) {
        setMenuList(handleMenus(res.data))
      }
    }
    createMenuList()
  }, [userId])

  return {
    menuList
  }
}
