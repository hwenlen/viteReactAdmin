import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'
import { RouteResultModel } from '@/router/types'
import { userStore } from '@/store/userStore'
import { getRoutes } from '@/apis/user'
import { layoutRoutes } from '@/router/routes'

interface PropsType {
  pathName: string
}
// 获取本地默认写死的的fullpath
function getDefaultFullPath(routes: RouteResultModel[]) {
  const defaultFullnames: string[] = []
  getFullPath(routes)
  function getFullPath(routes: RouteResultModel[]) {
    routes.map(item => {
      if (item.meta?.Auth == 'all') {
        defaultFullnames.push(item.path)
      }
      if (item.children && item.children.length > 0) {
        getFullPath(item.children)
      }
    })
  }
  return defaultFullnames
}
// 获取所有权限
function getAllPathname(data: RouteResultModel[]) {
  const defaultFullname = getDefaultFullPath(layoutRoutes([]) as unknown as RouteResultModel[])
  const permissionFullname: string[] = []
  data.map(item => {
    if (item.fullpath) {
      permissionFullname.push(item.fullpath)
    }
  })
  return [...defaultFullname, ...permissionFullname]
}

const PermissionRouter = ({ pathName }: PropsType) => {
  const userId = userStore(state => state.userId)
  const [permission, setPermission] = useState<string[]>([])

  useEffect(() => {
    // 使用接口获取白名单
    async function getPermission() {
      if (userId) {
        const res = await getRoutes({ uid: userId })
        if (res.code != 200) {
          window.location.href = "/login"
          return
        }
        setPermission(getAllPathname(res.data))
      }
    }
    getPermission()
  }, [userId])

  if (permission.length == 0) {
    // 白名单未获取到， loading
    return <Spinner></Spinner>
  } else if (permission.length > 0 && !permission.includes(pathName)) {
    // 白名单已获取到，但页面不在白名单内
    return <Navigate to={'/404'}></Navigate>
  } else {
    return <Outlet />
  }
}

export default PermissionRouter
