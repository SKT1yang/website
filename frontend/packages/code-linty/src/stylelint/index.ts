/**
 * Stylelint配置模块
 * 提供Stylelint相关的配置和工具函数
 */
import type { Config } from 'stylelint'

/**
 * 生成Stylelint配置
 * @returns {Config} Stylelint配置对象
 */
function stylelint(): Config {
  const config: Config = {
    // 基础配置
    extends: [
      'stylelint-config-standard',
      'stylelint-config-property-sort-order-smacss'
    ],
    
    // 插件配置
    plugins: ['stylelint-order'],
    
    // 文件覆盖配置
    overrides: [
      {
        files: ['**/*.(css|html|vue)'],
        customSyntax: 'postcss-html'
      }
    ],
    
    // 规则配置
    rules: {
      'string-quotes': 'double',
      'declaration-block-no-duplicate-properties': true
    },
    
    // 忽略文件配置
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
  }
  return config
}

const defaultConfig = stylelint()

export { defaultConfig as default, stylelint }
export type { Config } from 'stylelint'
