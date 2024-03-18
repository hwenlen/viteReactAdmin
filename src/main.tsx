import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import "@/assets/css/index.less"
dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
  // </React.StrictMode>,
)
