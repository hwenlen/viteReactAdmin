import { Suspense, lazy, LazyExoticComponent, ComponentType } from "react"
import { Navigate } from "react-router-dom";
import Login from "@/views/Login"
import Layout from "@/views/Layout"
import Spinner from '@/components/Spinner'
import AuthRoute from '@/components/AuthRoute'
import { RoutesCustomModel } from "./types";



export const lazyLoad = (importFun: () => Promise<{ default: ComponentType<any>; }>) => {
  const LazyComponent: LazyExoticComponent<ComponentType<any>> = lazy(importFun)
  return <Suspense fallback={<Spinner />}>
    <LazyComponent />
  </Suspense>
}

export const homeMatch = {
  path: '/home',
  pathname: '/home',
  meta: {
    title: '首页',
    Auth: 'all',
    affix: true
  }
}
// 404
export const NotFount = [
  {
    path: '/403',
    meta: {
      title: '403'
    },
    element: lazyLoad(() => import("@/views/Error/403"))
  },
  {
    path: '*',
    meta: {
      title: '登录'
    },
    element: lazyLoad(() => import("@/views/Error/NotFound"))
  }
]
// 其他路由
export const otherRoutes = [
  {
    path: '/finance',
    element: <Navigate replace to={"/finance/fundincome"} />
  },
  {
    path: '/finance',
    meta: {
      title: '平台财务',
    },
    children: [
      {
        path: 'fundincome',
        meta: {
          title: '资金收入表',
        },
        element: lazyLoad(() => import("@/views/Finance/Fundincome"))
      }, {
        path: 'fundexpend',
        meta: {
          title: '资金支出表',
        },
        element: lazyLoad(() => import("@/views/Finance/Fundexpend"))
      }
    ]
  }, {
    path: '/personnel',
    element: <Navigate replace to={"/personnel/member"} />
  }, {
    path: '/personnel',
    meta: {
      title: '人员管理',
    },
    children: [
      {
        path: 'member',
        meta: {
          title: '会员列表'
        },
        element: lazyLoad(() => import("@/views/Personnel/Member"))
      }
    ]
  }, {
    path: '/order',
    element: <Navigate replace to={"/order/commodity"} />
  }, {
    path: '/order',
    meta: {
      title: '订单列表',
    },
    children: [
      {
        path: 'commodity',
        meta: {
          title: '商品订单',
        },
        element: lazyLoad(() => import("@/views/Order/Commodity"))
      }, {
        path: 'serve',
        meta: {
          title: '服务订单',
        },
        element: lazyLoad(() => import("@/views/Order/Serve"))
      }
    ]
  }
]
// 默认路由
export const layoutRoutes = (lauoutChildren: RoutesCustomModel[]) => {
  return [
    {
      path: '/login',
      meta: {
        title: '登录',
        Auth: 'all',
      },
      element: <AuthRoute><Login /></AuthRoute>
    },
    {
      path: '/',
      element: <Navigate replace to={"/home"} />
    }, {
      path: '/',
      meta: {
        title: '首页',
        Auth: 'all',
      },
      element: <AuthRoute><Layout /></AuthRoute>,
      // Component: Layout,
      children: [
        {
          ...homeMatch,
          element: lazyLoad(() => import("@/views/Home"))
        },
        ...lauoutChildren
      ]
    }
  ]
}