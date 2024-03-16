import React, { useState } from 'react';
import styles from './index.module.less'
import { Layout, theme } from 'antd';
import { Outlet } from "react-router-dom"
import LayMenu from './components/LayMenu';
import LayTagNav from './components/LayTagNav';
import LayHeader from './components/LayHeader';
import { useRouteInfo } from '@/hooks/useRouteInfo';

const { Header, Sider, Content } = Layout;

const LayoutView: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { pathname, routeInfos } = useRouteInfo()

  return (
    <Layout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
        zIndex: 99,
        overflow: 'auto',
        maxHeight: '100vh',
      }}>
        <div className={styles['logo']}>
          <p style={{
            display: collapsed ? 'none' : 'block'
          }}>欢迎登录</p>
        </div>
        <LayMenu pathName={pathname} routeInfos={routeInfos} />
      </Sider>
      <Layout>
        <Header className={styles['layout-header']} style={{ background: colorBgContainer }}>
          <LayHeader collapsed={collapsed} setCollapsed={setCollapsed} routeInfos={routeInfos} />
        </Header>
        <Layout>
          <LayTagNav pathName={pathname} routeInfos={routeInfos} />
          <Content
            style={{
              margin: '0 24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout >
  );
};

export default LayoutView;