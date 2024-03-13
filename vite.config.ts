import { defineConfig, loadEnv } from 'vite'
import { createPlugins } from './config/plugin'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: createPlugins(env, command),
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer() // 自动添加前缀
        ]
      }
    },
    server: {
      proxy: {
        [env.VITE_BASE_URL_API]: {
          target: 'http://localhost:4173/', // 本地接口地址
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_BASE_URL_API), '')
        }
      }
    }
  }
})
