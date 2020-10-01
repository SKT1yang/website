module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 'error',
    eqeqeq: 'error',
    complexity: [0, 30], // 循环复杂度
    'prefer-const': 'error', // 首选const
    'valid-jsdoc': 'error', // jsdoc规则
    'space-before-function-paren': 0,
  },
}
