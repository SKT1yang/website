/**
 * React ESLint 配置
 * 整合了 React 和 React Hooks 的推荐规则
 * @returns {Linter.Config[]} ESLint 配置数组
 */
import type { Linter } from 'eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

/**
 * 生成 React 相关的 ESLint 配置
 * 包含 React 和 React Hooks 的推荐规则
 */
export function react(): Linter.Config[] {
  return [
    {
      plugins: {
        react: pluginReact, // React 插件
        'react-hooks': pluginReactHooks // React Hooks 插件
      },
      settings: {
        react: {
          version: 'detect' // 自动检测 React 版本
        }
      },
      rules: {
        ...pluginReact.configs.recommended.rules, // React 推荐规则
        ...pluginReactHooks.configs.recommended.rules // React Hooks 推荐规则
      }
    }
  ]
}

