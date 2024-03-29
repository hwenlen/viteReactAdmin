import React from 'react'
import { theme, Drawer, Divider, Flex, Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import modeDarkStore, { toggleDark } from '@/store/modeDarkStore'

interface PropsTypes {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LaySetting = ({ open, setOpen }: PropsTypes) => {
  const {
    token: { colorPrimary, colorText },
  } = theme.useToken();
  const modeDark = modeDarkStore.use.modeDark()

  return (
    <Drawer closeIcon={false} onClose={() => setOpen(false)} open={open}>
      <h3 style={{ color: colorText }}>项目配置</h3>
      <Divider>主题</Divider>

      <Flex justify={'center'} align={'center'}>
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          onChange={toggleDark}
          style={{
            background: modeDark == 'dark' ? "#000" : colorPrimary
          }} />
      </Flex>
    </Drawer >
  )
}

export default LaySetting