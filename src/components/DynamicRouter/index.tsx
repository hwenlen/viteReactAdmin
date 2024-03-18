import { useNavigate, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { userStore } from '@/store/userStore'
import routeStore, { setNavigate } from '@/store/routeStore'
import { useEffect, useState } from 'react'
import { layoutRoutes, NotFount } from '@/router/routes'
import { getRoutes } from '@/apis/user'
import { generateRouter, formatRouterTree } from '@/libs/routeMethod'
import Layout from "@/views/Layout"
import Spinner from '@/components/Spinner'

function DynamicRouter() {
  const userId = userStore(state => state.userId)
  const navigate = routeStore(state => state.navigate)
  const [loading, setLoading] = useState(false)
  const [routes, setRoutes] = useState<RouteObject[]>([...layoutRoutes([]), ...NotFount])
  const elements = useRoutes(routes)
  const Navigate = useNavigate()
  if (!navigate) {
    setNavigate(Navigate)
  }
  useEffect(() => {
    async function createRoutes() {
      if (userId) {
        const res = await getRoutes({ uid: userId })
        if (res.code != 200) {
          setLoading(true)
          setRoutes([...layoutRoutes([]), ...NotFount])
          window.location.href = "/login"
          return
        }
        const payload = formatRouterTree(res.data || [])
        const authRoutes = generateRouter(payload, <Layout />)
        const newRoutes = [...layoutRoutes(authRoutes as RouteObject[]), ...NotFount]
        setRoutes(newRoutes)
        routeStore.setState({
          dynamicRoutes: newRoutes
        })

      }
      setLoading(true)
    }
    createRoutes()
  }, [userId])

  if (!loading) {
    return <Spinner fulled></Spinner>
  }
  return elements
}

export default DynamicRouter
