import { routesAdmin, routesVisitor } from "./data/routes"
import { menuDataAdmin, menuDataVisitor } from "./data/menus"

const userInfoList = [
  {
    userName: 'Admin',
    roleName: '超级管理员',
    userId: 1,
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzAzOTgwODk1LCJ1c2VySWQiOjU3MzUwNywidGVybWluYWxUeXBlIjoxMDAwOH0'
  }, {
    userName: '13800000002',
    roleName: '普通管理员',
    userId: 2,
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzAzOTgwODk1LCJ1c2VySWQiOjU3MzUwNywidGVybWluYH0WxUeXBlIjoxMDAwO'
  }
]

const userList = [
  {
    username: '13800000001',
    password: '123456'
  }, {
    username: '13800000002',
    password: '123456'
  }
]

export default [
  {
    method: "post",
    url: "/api/login",
    response: (config: any) => {
      const { username, password } = config.query

      const checkUserIndex = userList.findIndex(item => item.username === username && password === item.password);
      if (checkUserIndex == -1) {
        return {
          code: 1001,
          message: "账号或密码错误",
          data: null
        }
      }


      return {
        code: 200,
        message: "success",
        data: userInfoList[checkUserIndex]
      };
    }
  }, {
    method: "post",
    url: "/api/loginout",
    response: () => {
      return {
        code: 200,
        message: "退出成功",
        data: null
      };
    }
  }, {
    method: "post",
    url: "/api/routes",
    response: (config: any) => {
      const { uid } = config.query
      if (!uid) {
        return {
          code: 1000,
          message: "缺少参数uid",
          data: null
        };
      }
      let routes: any;
      if (uid == 1) {
        routes = routesAdmin
      } else if (uid == 2) {
        routes = routesVisitor
      }

      return {
        code: 200,
        message: "获取成功",
        data: routes
      };
    }
  }, {
    method: "post",
    url: "/api/menus",
    response: (config: any) => {
      const { uid } = config.query
      if (!uid) {
        return {
          code: 1000,
          message: "缺少参数uid",
          data: null
        };
      }
      let routes: any;
      if (uid == 1) {
        routes = menuDataAdmin
      } else if (uid == 2) {
        routes = menuDataVisitor
      }

      return {
        code: 200,
        message: "获取成功",
        data: routes
      };
    }
  }
]