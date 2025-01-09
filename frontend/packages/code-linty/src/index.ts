/**
 * 代码质量工具主模块
 * 提供ESLint、OxLint、StyleLint等工具的配置和工具函数
 */
import { GLOB_EXCLUDE, eslint, ignores } from './eslint'

export {
  /** 
   * ESLint配置生成器
   * @see {@link ./eslint#eslint}
   */
  eslint,
  /** 
   * 忽略文件配置
   * @see {@link ./eslint#ignores}
   */
  ignores,
  /** 
   * 全局排除文件模式
   * @see {@link ./eslint#GLOB_EXCLUDE}
   */
  GLOB_EXCLUDE
}

export type { Linter } from 'eslint'
