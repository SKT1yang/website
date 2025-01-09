/**
 * 生成 ESLint 全局变量配置
 * 用于定义项目中使用的全局变量及其权限
 */
import type { Linter } from 'eslint'

export function by() {
  const result: Linter.Config[] = [
    {
      name: 'by', // 全局配置标识
      languageOptions: {
        globals: {
          defineOptions: 'readonly', // Vue 组件选项定义
          VoerkaI18n: 'readonly', // 国际化库实例
          t: 'writable', // 国际化翻译函数
          OEM_SETTINGS: 'writable', // OEM 定制配置
          __APP_GLOBAL_ROUTER_INSTANCE__: 'writable', // 全局路由实例
          __APP_GLOBAL_SCHEDULER_INSTANCE__: 'writable', // 全局调度器实例
          __APP_GLOBAL_STORE_INSTANCE__: 'writable', // 全局状态管理实例
          __APP_GLOBAL_THEME_INSTANCE__: 'writable' // 全局主题实例
        }
      }
    }
  ]
  return result
}
