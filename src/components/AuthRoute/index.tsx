
import { Navigate, useLocation } from 'react-router-dom';
import { userStore } from "@/store/userStore"
import { ReactNode } from 'react';
const AuthRoute = ({ children }: { children: ReactNode }) => {
  const token = userStore(state => state.token)

  const { pathname } = useLocation()

  // 没有登录，且当前不在登录页
  if (pathname !== '/login' && !token) {
    return <Navigate to="/login" replace />;
  } else if (token && pathname === '/login') {
    // 登录了且当前在登录页，跳转首页
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

export default AuthRoute