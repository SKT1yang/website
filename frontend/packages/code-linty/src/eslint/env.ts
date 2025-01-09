/**
 * ESLint 环境检测工具模块
 * 提供编辑器环境、框架和工具链的检测功能
 */
import process from 'node:process'
import { isPackageExists } from 'local-pkg'

/**
 * 检测当前是否在编辑器环境中运行
 * 通过检查常见编辑器的环境变量来判断
 */

function checkEditorEnvVars() {
  return !!(
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM
  )
}

/**
 * 检测当前是否在编辑器环境中运行
 * 通过检查常见编辑器的环境变量来判断
 * 排除 CI 环境（持续集成环境）
 */
export const isInEditor = checkEditorEnvVars() && !process.env.CI
/**
 * 检测项目中是否安装了 TypeScript
 */
export const hasTypeScript = isPackageExists('typescript')
/**
 * 检测项目中是否使用了 Vue 相关框架
 * 包括：
 * - Vue 核心库
 * - Nuxt 框架
 * - VitePress 文档框架
 * - Slidev 幻灯片框架
 */
export const hasVue =
  isPackageExists('vue') || // Vue 核心库
  isPackageExists('nuxt') || // Nuxt 框架
  isPackageExists('vitepress') || // VitePress 文档框架
  isPackageExists('@slidev/cli') // Slidev 幻灯片框架

export const hasReact = isPackageExists('react')

/**
 * 检测项目中是否使用了 Unocss
 * 包括：
 * - Unocss 核心库
 * - Webpack 集成
 * - Nuxt 集成
 */
export const hasUnocss =
  isPackageExists('unocss') || // Unocss 核心库
  isPackageExists('@unocss/webpack') || // Webpack 集成
  isPackageExists('@unocss/nuxt') // Nuxt 集成
