import React, { useState } from 'react';
import { menuData } from './menuData';
import { Menu, MenuProps } from 'antd';
// import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate, useMatches } from "react-router-dom"

const rootSubmenuKeys = menuData.map(item => item.key)

interface PropsTypes {
  pathName: string
}

const LayMenu: React.FC<PropsTypes> = ({ pathName }) => {
  const matches = useMatches()

  const [openKeys, setOpenKeys] = useState([matches[0].pathname]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

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
      items={menuData}
      onClick={handleMenu}
    />
  );
};

export default LayMenu;