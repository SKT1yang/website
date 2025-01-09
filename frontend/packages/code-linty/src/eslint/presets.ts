/**
 * 完整的ESLint配置预设，包含：
 * - `presetBasic` (JavaScript + TypeScript支持)
 * - Vue支持 (自动检测)
 * - React支持 (自动检测)
 * - by规则 (默认启用)
 * - i18n包装支持 (可选)
 */
import { hasReact, hasVue } from './env'
import { by, i18n, ignores, javascript, react, typescript, vue } from './configs'
import type { Linter } from 'eslint'
import type { I18nWrapConfig } from './configs'

/** 包含忽略规则、JavaScript和TypeScript支持的基础配置 */
const presetBasic = [...ignores(), ...javascript(), ...typescript]

/**
 * ESLint预设配置选项
 */
type PresetOptions = {
  /** 
   * 是否启用Vue支持
   * @default 自动检测项目是否包含Vue
   */
  enableVue?: boolean
  /** 
   * 是否启用React支持 
   * @default 自动检测项目是否包含React
   */
  enableReact?: boolean
  /** 
   * 是否启用by规则
   * @default false
   */
  enableBy?: boolean
  /** 
   * i18n国际化配置
   * @see I18nWrapConfig
   */
  i18nConfig?: I18nWrapConfig
}

/**
 * 根据提供的选项生成ESLint配置
 * @param config - 要扩展的基础ESLint配置
 * @param options - 配置选项
 * @param options.vue - 启用Vue支持 (默认: 自动检测)
 * @param options.by - 启用by规则 (默认: false)
 * @param options.i18nWrap - i18n包装配置
 * @returns {Linter.Config[]} - ESLint配置数组
 */
function eslint(
  config: Linter.Config | Linter.Config[] = [],
  options?: PresetOptions
): Linter.Config[] {
  // 解构选项
  const { enableVue = hasVue, enableReact = hasReact, enableBy = false, i18nConfig } = options || {}

  // 使用基础配置初始化
  const configs: Linter.Config[] = [...presetBasic]

  // 按需添加Vue、React和by规则支持
  if (enableVue) configs.push(...vue)
  if (enableReact) configs.push(...react())
  if (enableBy) configs.push(...by())

  // 如果提供了i18n包装配置则追加
  if (i18nConfig) {
    configs.push(...i18n(i18nConfig))
  }

  // 如果提供了自定义配置则追加
  if (config) {
    // 处理单个配置对象或配置数组
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}

export { eslint }
