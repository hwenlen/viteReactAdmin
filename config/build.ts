export function setBuild() {
  return {
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',  // 引入包文件模式
        entryFileNames: 'static/js/[name]-[hash].js',  // 入口文件模式
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',  // 静态资源模式
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return id.toString().match(/\/node_modules\/(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender'
          }
        },
        // manualChunks(id: any) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender'
        //   }
        // }
      }
    }
  }
}