import React, { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
// import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate } from "react-router-dom"
import { routeMatchType } from "@/router/types";
import { useMenus } from '@/hooks/useMenus';


interface PropsTypes {
  pathName: string,
  routeInfos: routeMatchType[]
}

const LayMenu: React.FC<PropsTypes> = ({ pathName, routeInfos }) => {
  const { menuList } = useMenus()
  const rootSubmenuKeys = menuList.map(item => item.key)
  const [openKeys, setOpenKeys] = useState([routeInfos[1]?.pathname] || []);
  // 点击tagnav route变化时展开对应菜单
  useEffect(() => {
    setOpenKeys([routeInfos[1]?.pathname]);
  }, [routeInfos])
  // 点击菜单，收起其他展开的所有菜单
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // 点击menu跳转
  const navigate = useNavigate()
  const handleMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[pathName]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={menuList}
      onClick={handleMenu}
    />
  );
};

export default LayMenu;