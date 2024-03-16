import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import styles from './index.module.less'
import { Button, Breadcrumb, Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import { userStore } from '@/store/userStore';
import { routeMatchType } from "@/router/types";
import { useShallow } from 'zustand/react/shallow';

const { confirm } = Modal;

interface PropsTypes {
  collapsed: boolean,
  setCollapsed: Dispatch<SetStateAction<boolean>>,
  routeInfos: routeMatchType[]
}

interface breadcrumbItemsTypes {
  title: string | undefined,
  path?: string
}
// 处理面包屑数据
const handleRouteList = (routeInfos: routeMatchType[]) => {
  let Itm: breadcrumbItemsTypes[];
  const lastRoute = routeInfos![routeInfos.length - 1]

  if (lastRoute.path !== '/home') {
    Itm = routeInfos.map((item: routeMatchType) => {
      return {
        title: item.meta?.title,
        path: item.path
      }
    })
  } else {
    Itm = [{
      title: lastRoute.meta.title,
      path: lastRoute.path
    }]
  }
  return Itm
}
// 和 browserHistory 配合使用path
function itemRender(currentRoute: any, _params: any, items: any, paths: any) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;
  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`${paths.join("/")}`}>{currentRoute.title}</Link>
  );
}

const DropDownitems: MenuProps['items'] = [
  {
    label: '修改密码',
    key: 'editPassWord',
  },
  {
    label: '退出登录',
    key: 'loginOut',
  }
];

const LayHeader = ({ collapsed, setCollapsed, routeInfos }: PropsTypes) => {
  // const handleLoginOut = userStore(state => state.handleLoginOut)
  const [roleName, handleLoginOut] = userStore(useShallow(
    state => [state.roleName, state.handleLoginOut]
  ))

  const [breadcrumbItems, setBreadcrumbItems] = useState<breadcrumbItemsTypes[]>([])

  useEffect(() => {
    document.title = routeInfos[routeInfos.length - 1].meta?.title || 'vite'
    setBreadcrumbItems(handleRouteList(routeInfos))
  }, [routeInfos])

  const handleUserAction = (key: string) => {
    switch (key) {
      case 'editPassWord':
        // 修改密码
        break;
      case 'loginOut':
        // 退出登录
        confirm({
          title: '提示',
          icon: <ExclamationCircleFilled />,
          content: '确定要退出登录？',
          onOk() {
            handleLoginOut();
          }
        })
        break;
      default:
        break;
    }
  }


  return (
    <>
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />

        <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} items={breadcrumbItems} />
      </div>
      <div className={styles['header-right']}>
        <p>{roleName}</p>
        <Dropdown menu={{
          items: DropDownitems,
          onClick: ({ key }) => handleUserAction(key)
        }} arrow>
          <img src="https://5b0988e595225.cdn.sohucs.com/images/20171114/bc48840fb6904dd4bd8f6a8af8178af4.png" alt="" />
        </Dropdown>
      </div>
    </>
  )
}

export default LayHeader