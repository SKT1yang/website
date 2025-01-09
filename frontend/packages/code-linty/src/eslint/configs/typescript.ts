/**
 * TypeScript ESLint配置模块
 * 提供TypeScript项目的ESLint配置，包含核心规则和扩展配置
 */

import { GLOB_JS, GLOB_TS, GLOB_TSX } from '../globs'
import { tseslint } from '../plugins'
import { restrictedSyntaxJs } from './javascript'
import type { Linter } from 'eslint'

export const typescriptCore = tseslint.config({
  name: 'typescript-core',
  extends: [...tseslint.configs.recommended],
  files: [GLOB_TS, GLOB_TSX],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      sourceType: 'module'
    }
  },
  rules: {
    /**
     * 禁止使用 @ts-ignore 注释
     * 反例：// @ts-ignore
     * 正例：使用类型断言或显式类型声明
     */
    '@typescript-eslint/ban-ts-comment': 'off',

    /**
     * 禁止使用某些类型
     * 反例：let x: String = new String('abc')
     * 正例：let x: string = 'abc'
     */
    '@typescript-eslint/ban-types': 'off',

    /**
     * 强制使用一致的类型断言风格
     * 使用 'as' 语法进行类型断言
     * 反例：<string>str
     * 正例：str as string
     */
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as', // 强制使用 as 语法
        objectLiteralTypeAssertions: 'allow-as-parameter' // 允许对象字面量作为参数
      }
    ],

    /**
     * 强制使用一致的类型导入风格
     * 使用内联类型导入
     * 反例：import { type A } from 'a'
     * 正例：import type { A } from 'a'
     */
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { 
        disallowTypeAnnotations: false, // 允许类型注解
        fixStyle: 'inline-type-imports' // 使用内联类型导入
      }
    ],

    /**
     * 强制使用方法签名风格
     * 使用属性风格定义方法
     * 反例：interface I { method(): void }
     * 正例：interface I { method: () => void }
     */
    '@typescript-eslint/method-signature-style': ['error', 'property'],

    /**
     * 禁止使用 any 类型
     * 反例：let x: any = 1
     * 正例：let x: number = 1
     */
    '@typescript-eslint/no-explicit-any': 'off',

    /**
     * 禁止导入类型时的副作用
     * 反例：import 'types' 导致副作用
     * 正例：import type { T } from 'types'
     */
    '@typescript-eslint/no-import-type-side-effects': 'error',

    /**
     * 禁止使用非空断言
     * 反例：let x = y!.z
     * 正例：if (y) { let x = y.z }
     */
    '@typescript-eslint/no-non-null-assertion': 'off',

    /**
     * 禁止重复声明
     * 反例：let x = 1; let x = 2
     * 正例：let x = 1; let y = 2
     */
    '@typescript-eslint/no-redeclare': 'error',

    /**
     * 禁止未使用的变量
     * 反例：let x = 1; // x 未使用
     * 正例：let x = 1; console.log(x)
     */
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
        caughtErrorsIgnorePattern: '^_'
      }
    ],

    /**
     * 禁止未使用的表达式
     * 反例：1 + 1; // 表达式未使用
     * 正例：const x = 1 + 1
     */
    '@typescript-eslint/no-unused-expressions': 'off',

    /**
     * 推荐使用 as const 断言
     * 反例：let x = 'hello'
     * 正例：let x = 'hello' as const
     */
    '@typescript-eslint/prefer-as-const': 'warn',

    /**
     * 推荐使用字面量枚举成员
     * 反例：enum E { A = 1 << 1 }
     * 正例：enum E { A = 2 }
     */
    '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],

    /**
     * 限制特定语法
     * 反例：使用被限制的语法
     * 正例：使用推荐的替代语法
     */
    'no-restricted-syntax': ['error', ...restrictedSyntaxJs, 'TSEnumDeclaration[const=true]']
  }
}) as Linter.Config[]

export const typescript: Linter.Config[] = [
  ...typescriptCore,

  {
    files: ['**/*.d.ts'],
    rules: {
      /**
       * 允许在 .d.ts 文件中禁用所有规则
       * 反例：// eslint-disable-next-line
       * 正例：// eslint-disable-next-line specific-rule
       */
      'eslint-comments/no-unlimited-disable': 'off',

      /**
       * 允许在 .d.ts 文件中重复导入
       * 反例：import { A } from 'a'; import { A } from 'a'
       * 正例：import { A, B } from 'a'
       */
      'import/no-duplicates': 'off',

      /**
       * 允许在 .d.ts 文件中存在未使用的变量
       * 反例：let x = 1; // x 未使用
       * 正例：let x = 1; console.log(x)
       */
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.{test,spec}.ts?(x)'],
    rules: {
      /**
       * 允许在测试文件中存在未使用的表达式
       * 反例：1 + 1; // 表达式未使用
       * 正例：expect(1 + 1).toBe(2)
       */
      'no-unused-expressions': 'off'
    }
  },
  {
    files: [GLOB_JS, '**/*.cjs'],
    rules: {
      /**
       * 允许在 JavaScript 文件中使用 require 导入
       */
      '@typescript-eslint/no-require-imports': 'off',

      /**
       * 允许在 JavaScript 文件中使用 require 变量
       */
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      /**
       * 限制 .d.ts 文件中的特定语法
       * 反例：使用被限制的语法
       * 正例：使用推荐的替代语法
       */
      'no-restricted-syntax': ['error', ...restrictedSyntaxJs]
    }
  }
]
