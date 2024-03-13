import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'


export function createPlugins(env: Record<string, string>, command: "build" | "serve") {
  return [
    react(),
    viteMockServe({
      mockPath: 'mock',
      ignore: /^_/, // 忽略下划线开头的文件
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve' && env.VITE_USE_MOCK == 'true',
      //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
        import { setupProdMockServer } from '../mock/_mockProdServer';
        setupProdMockServer();
      `
    })
  ]
}