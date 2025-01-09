import process from 'node:process'
import { getPackageInfoSync } from 'local-pkg'
import { GLOB_VUE } from '../globs'
import { parserVue, pluginVue, tseslint } from '../plugins'
import { typescriptCore } from './typescript'
import type { Linter } from 'eslint'

/**
 * 获取Vue版本号
 * @returns Vue主版本号 (2 或 3)
 * @description 
 * 1. 通过local-pkg获取项目中的vue包信息
 * 2. 解析版本号第一个数字
 * 3. 如果无法获取版本号，默认返回3
 */
export function getVueVersion(): 2 | 3 {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (pkg && typeof pkg.version === 'string' && !Number.isNaN(+pkg.version[0])) {
    const version = +pkg.version[0]
    return version === 2 ? 2 : 3
  }
  return 3
}
const isVue3 = getVueVersion() === 3

export const reactivityTransform: Linter.Config[] = [
  {
    name: 'vue-reactivity-transform',
    languageOptions: {
      globals: {
        $: 'readonly',
        $$: 'readonly',
        $computed: 'readonly',
        $customRef: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $toRef: 'readonly'
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      /**
       * 允许在 setup 中丢失 props 的响应性
       * 反例：const { prop } = defineProps(); prop = 'new value'
       * 正例：const props = defineProps(); props.prop = 'new value'
       */
      'vue/no-setup-props-reactivity-loss': 'off'
    }
  }
]

const vueCustomRules: Linter.RulesRecord = {
  /**
   * 强制 Vue 组件块的顺序
   * 反例：<script>...</script><template>...</template>
   * 正例：<template>...</template><script>...</script>
   */
  'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],

  /**
   * 强制自定义事件名使用驼峰命名
   * 反例：@my-event="handler"
   * 正例：@myEvent="handler"
   */
  'vue/custom-event-name-casing': ['error', 'camelCase'],

  /**
   * 强制使用智能的相等比较
   * 反例：if (a == b) {}
   * 正例：if (a === b) {}
   */
  'vue/eqeqeq': ['error', 'smart'],

  /**
   * 强制 HTML 自闭合标签
   * 反例：<div></div>
   * 正例：<div />
   */
  'vue/html-self-closing': [
    'error',
    {
      html: {
        component: 'always',
        normal: 'always',
        void: 'any'
      },
      math: 'always',
      svg: 'always'
    }
  ],

  /**
   * 关闭每行最大属性数限制
   */
  'vue/max-attributes-per-line': 'off',

  /**
   * 关闭多单词组件名限制
   */
  'vue/multi-word-component-names': 'off',

  /**
   * 关闭常量条件检查
   */
  'vue/no-constant-condition': 'off',

  /**
   * 禁止空模式
   * 反例：const {} = obj
   * 正例：const { prop } = obj
   */
  'vue/no-empty-pattern': 'error',

  /**
   * 禁止精度丢失
   * 反例：const x = 0.1 + 0.2
   * 正例：const x = 0.3
   */
  'vue/no-loss-of-precision': 'error',

  /**
   * 禁止未使用的 ref
   * 反例：const count = ref(0)
   * 正例：const count = ref(0); console.log(count.value)
   */
  'vue/no-unused-refs': 'error',

  /**
   * 禁止无用的 v-bind
   * 反例：<div v-bind:id="id"></div>
   * 正例：<div :id="id"></div>
   */
  'vue/no-useless-v-bind': 'error',

  /**
   * 关闭 v-html 检查
   */
  'vue/no-v-html': 'off',

  /**
   * 强制对象简写
   * 反例：{ foo: foo }
   * 正例：{ foo }
   */
  'vue/object-shorthand': [
    'error',
    'always',
    {
      avoidQuotes: true,
      ignoreConstructors: false
    }
  ],

  /**
   * 关闭单文件单组件限制
   */
  'vue/one-component-per-file': 'off',

  /**
   * 强制块之间添加空行
   * 反例：<template>...</template><script>...</script>
   * 正例：<template>...</template>\n<script>...</script>
   */
  'vue/padding-line-between-blocks': ['error', 'always'],

  /**
   * 强制使用模板字符串
   * 反例：'Hello ' + name
   * 正例：`Hello ${name}`
   */
  'vue/prefer-template': 'error',

  /**
   * 关闭要求默认 prop 值
   */
  'vue/require-default-prop': 'off',

  /**
   * 关闭要求 prop 类型
   */
  'vue/require-prop-types': 'off',

  /**
   * 关闭单行 HTML 元素内容换行
   */
  'vue/singleline-html-element-content-newline': 'off',

  /**
   * 关闭 HTML 缩进检查
   */
  'vue/html-indent': 'off'
}

const getVueRules = (isVue3: boolean): Linter.RulesRecord => ({
  ...pluginVue.configs.base.rules,
  ...(isVue3
    ? {
        ...pluginVue.configs['vue3-essential'].rules,
        ...pluginVue.configs['vue3-strongly-recommended'].rules,
        ...pluginVue.configs['vue3-recommended'].rules
      }
    : {
        ...pluginVue.configs.essential.rules,
        ...pluginVue.configs['strongly-recommended'].rules,
        ...pluginVue.configs.recommended.rules
      })
})

export const vue: Linter.Config[] = [
  ...(tseslint.config({
    extends: typescriptCore as any[],
    files: [GLOB_VUE]
  }) as any),
  {
    name: 'vue',
    files: [GLOB_VUE],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...getVueRules(isVue3),
      ...vueCustomRules
    }
  },
  ...reactivityTransform
]
