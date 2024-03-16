import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

type menuTypeItem = {
  key: string;
  icon: JSX.Element;
  label: string;
  children: {
    key: string;
    icon: JSX.Element;
    label: string;
  }[];
} | {
  key: string;
  icon: JSX.Element;
  label: string;
  children?: undefined;
}

export type menuType = menuTypeItem[]

export const menuData = [
  {
    key: "/finance",
    icon: <VideoCameraOutlined />,
    label: '平台财务',
    children: [{
      key: "/finance/fundincome",
      icon: <VideoCameraOutlined />,
      label: '资金收入表'
    }, {
      key: "/finance/fundexpend",
      icon: <VideoCameraOutlined />,
      label: '资金支出表'
    }],
  }, {
    key: "/personnel/member",
    icon: <UploadOutlined />,
    label: '会员列表'
  }, {
    key: "/order",
    icon: <UserOutlined />,
    label: '订单管理',
    children: [{
      key: "/order/commodity",
      icon: <VideoCameraOutlined />,
      label: '商品订单'
    }, {
      key: "/order/serve",
      icon: <VideoCameraOutlined />,
      label: '服务订单',
    }]
  }
]