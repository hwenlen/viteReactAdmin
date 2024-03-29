import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import Spinner from '@/components/Spinner'
import modeDarkStore from './store/modeDarkStore';
import { useEffect } from 'react';
dayjs.locale("zh-cn");

function App() {
  const modeDark = modeDarkStore.use.modeDark()

  useEffect(() => {

    if (modeDark == 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }
  }, [modeDark])

  return (
    <ConfigProvider locale={zhCN} theme={{
      algorithm: modeDark == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
    }}>
      <RouterProvider
        router={router}
        fallbackElement={<Spinner fulled />}>
      </RouterProvider>
    </ConfigProvider>
  )
}

export default App
