const routesAdmin = [
  {
    id: 1,
    pid: 0,
    path: "/finance",
    redirect: "/finance/fundincome",
    meta: {
      title: '平台财务',
      icon: "location"
    },
    element: null,
  }, {
    id: 2,
    pid: 1,
    path: "fundincome",
    meta: {
      title: '资金收入表',
      icon: "location"
    },
    element: "Finance/Fundincome",
  }, {
    id: 3,
    pid: 1,
    path: "fundexpend",
    meta: {
      title: '资金支出表',
      icon: "location"
    },
    element: "Finance/Fundexpend",
  }, {
    id: 4,
    pid: 0,
    path: "/personnel",
    redirect: "/personnel/member",
    meta: {
      title: '人员管理',
      icon: "location"
    },
    element: null,
  }, {
    id: 5,
    pid: 4,
    path: "member",
    meta: {
      title: '会员列表',
      icon: "location"
    },
    element: "Personnel/Member",
  }, {
    id: 6,
    pid: 0,
    path: "/order",
    redirect: "/order/commodity",
    meta: {
      title: '订单管理',
      icon: "location"
    },
    element: null,
  }, {
    id: 7,
    pid: 6,
    path: "commodity",
    meta: {
      title: '商品订单',
      icon: "location"
    },
    element: "Order/Commodity",
  }, {
    id: 8,
    pid: 6,
    path: "serve",
    meta: {
      title: '服务订单',
      icon: "location"
    },
    element: "Order/Serve",
  }
]

const routesVisitor = [
  {
    id: 1,
    pid: 0,
    path: "/finance",
    redirect: "/finance/fundincome",
    meta: {
      title: '平台财务',
      icon: "location"
    },
    element: null,
  }, {
    id: 2,
    pid: 1,
    path: "fundincome",
    meta: {
      title: '资金收入表',
      icon: "location"
    },
    element: "Finance/Fundincome",
  }, {
    id: 3,
    pid: 1,
    path: "fundexpend",
    meta: {
      title: '资金支出表',
      icon: "location"
    },
    element: "Finance/Fundexpend",
  }, {
    id: 6,
    pid: 0,
    path: "/order",
    redirect: "/order/commodity",
    meta: {
      title: '订单管理',
      icon: "location"
    },
    element: null,
  }, {
    id: 7,
    pid: 6,
    path: "commodity",
    meta: {
      title: '商品订单',
      icon: "location"
    },
    element: "Order/Commodity",
  }, {
    id: 8,
    pid: 6,
    path: "serve",
    meta: {
      title: '服务订单',
      icon: "location"
    },
    element: "Order/Serve",
  }
]

export {
  routesAdmin,
  routesVisitor
}