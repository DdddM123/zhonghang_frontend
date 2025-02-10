import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',//修改目录
  outputDir: 'dist', // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  assetsDir: 'assets', // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存
  lintOnSave: true,
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本

  plugins: [vue()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'localhost:8000',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
