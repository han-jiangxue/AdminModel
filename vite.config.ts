import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unoCSS'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    AutoImport({
      // 生成类型声明文件路径，设为 false 可禁止生成文件
      dts: './src/auto-imports.d.ts',
      imports: ['vue'],
      eslintrc: {
        // 启用与 Eslint 集成
        enabled: true,
        // 生成 EsLint 配置文件的路径，在下面 Eslint 配置部分会使用
        filepath: './eslintrc-auto-import.json',
        // 用于覆盖 globals 属性，
        globalsPropValue: true,
      },
      // 路径解析器列表
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 生成类型声明文件路径，设为 false 可禁止生成文件
      dts: './src/components.d.ts',
      // 组件路径解析器列表
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 路由重写
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    // 可以以IP访问
    host: true,
    // 端口
    port: 8080,
    // 自动打开游览器
    open: true,
    // 允许跨域
    cors: true,
    proxy: {
      // 这里配置真实的后端环境地址
      '/v2/api': {
        target: 'https://xyt-wx.cumt.edu.cn/v2/api',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/v2\/api/, ''),
      },
    },
  },
  build: {
    sourcemap: false,
    // 使用 Terser 压缩工具进行代码压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
