/**
 * ESLint插件模块
 * 提供ESLint相关插件的统一导入和类型支持
 */

// @ts-nocheck

/**
 * 默认导出类型
 * 用于处理模块的默认导出
 */
export type InteropDefault<T> = T extends { default: infer U } ? U : T

/**
 * 获取模块的默认导出
 * @param m - 需要处理的模块
 * @returns 模块的默认导出或模块本身
 */
/* #__NO_SIDE_EFFECTS__ */
function interopDefault<T>(m: T): InteropDefault<T> {
  return (m as any).default || m
}

// 插件导入
import * as _pluginAntfu from 'eslint-plugin-antfu'
import * as _pluginVue from 'eslint-plugin-vue'
import * as _pluginUnusedImports from 'eslint-plugin-unused-imports'
import * as _plugini18nWrap from 'eslint-plugin-i18n-wrap'

// 插件导出
export const pluginAntfu: typeof import('eslint-plugin-antfu').default = interopDefault(_pluginAntfu)
export const pluginVue = interopDefault(_pluginVue)
export const pluginUnusedImports = interopDefault(_pluginUnusedImports)
export const plugini18nWrap = interopDefault(_plugini18nWrap)

// 其他工具导出
export { default as tseslint } from 'typescript-eslint'
export * as parserVue from 'vue-eslint-parser'
