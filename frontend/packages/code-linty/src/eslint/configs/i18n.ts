/**
 * 国际化相关 ESLint 配置
 * 用于管理项目中国际化相关的代码规范
 */
import type { Linter } from 'eslint'
import { plugini18nWrap } from '../plugins'

/**
 * 国际化包装配置
 * @property open - 是否开启国际化检查
 * @property auto - 是否自动导入国际化函数
 * @property pathSuffix - 国际化函数路径后缀
 * @property staticEntry - 静态语言文件入口路径
 */
type I18nWrapConfig = {
  open: boolean
  auto: false
  pathSuffix: string
  staticEntry: string
}

/**
 * 生成国际化相关 ESLint 配置
 * @param i18nWrap - 国际化包装配置
 * @returns 返回 ESLint 配置数组
 */
export function i18n(i18nWrap?: Partial<I18nWrapConfig>) {
  // 设置默认配置
  const {
    open = false, // 默认关闭国际化检查
    auto = false, // 默认不自动导入
    pathSuffix = '/useLanguage.ts', // 默认路径后缀
    staticEntry = 'entry/languages' // 默认语言文件入口
  } = i18nWrap || {}

  const result: Linter.Config[] = []

  // 如果开启国际化检查
  if (open) {
    const config = Object.assign(plugini18nWrap.configs.all, {
      rules: {
        // 强制包装国际化函数
        'i18n/wrap-i18n-function': 'error',
        // 强制导入国际化函数
        'i18n/import-i18n-function': [
          'error',
          {
            auto, // 是否自动导入
            pathSuffix, // 路径后缀
            staticEntry // 静态语言文件入口
          }
        ]
      }
    })
    result.push(config)
  }

  return result
}

export type { I18nWrapConfig }
