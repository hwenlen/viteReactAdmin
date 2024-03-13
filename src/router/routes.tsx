import { Suspense, lazy, LazyExoticComponent, ComponentType } from "react"
import { Navigate } from "react-router-dom";
import Login from "@/views/Login"
import Layout from "@/views/Layout"
import AuthRoute from '@/components/AuthRoute'

export const lazyLoad = (importFun: () => Promise<{ default: ComponentType<any>; }>) => {
  const LazyComponent: LazyExoticComponent<ComponentType<any>> = lazy(importFun)
  return <Suspense fallback={"loading..."}>
    <LazyComponent />
  </Suspense>
}

export const homeMatch = {
  path: '/home',
  meta: {
    title: '首页',
    affix: true
  }
}
// 404
export const NotFount = [
  {
    path: '*',
    element: lazyLoad(() => import("@/views/Error/NotFound"))
  }
]
// 默认路由
export const defaultRoutes = [
  {
    path: '/login',
    meta: {
      title: '登录',
      unAuth: true,
    },
    element: <AuthRoute><Login /></AuthRoute>
  }, {
    path: '/',
    element: <Navigate replace to={"/home"} />
  }, {
    path: '/',
    meta: {
      title: '首页'
    },
    element: <AuthRoute><Layout /></AuthRoute>,
    // Component: Layout,
    children: [
      {
        ...homeMatch,
        element: lazyLoad(() => import("@/views/Home"))
      }
    ]
  }
]
// 其他路由
export const otherRoutes = [
  {
    path: '/finance',
    element: <Navigate replace to={"/finance/fundincome"} />
  }, {
    path: '/finance',
    meta: {
      title: '平台财务',
    },
    element: <AuthRoute><Layout /></AuthRoute>,
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
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        path: 'member',
        meta: {
          title: '会员列表',
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
    element: <AuthRoute><Layout /></AuthRoute>,
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

export const routes = [
  ...defaultRoutes,
  ...otherRoutes,
  ...NotFount
]