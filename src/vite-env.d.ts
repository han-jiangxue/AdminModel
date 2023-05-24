/// <reference types="vite/client" />

// 解决中文包引入时TS报错
declare module 'element-plus/dist/locale/zh-cn.mjs'
// 解决Vue引入TS报错
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}