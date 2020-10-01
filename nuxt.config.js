export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'zhjc-website',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    /*
     ** 配置全局 css
     */
    '@/assets/style/main.scss',
    '@/assets/iconfont/iconfont.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/style/element-variables.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/router', ssr: false },
    { src: '@/assets/js/iconfont', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  loading: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  styleResources: {
    scss: [
      './assets/style/variables.scss', // 全局 scss 变量
      './assets/style/mixins.scss', // 全局 scss 混合
    ],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],

  axios: {
    proxy: true,
    prefix: '/zhjc-admin/',
    credentials: true,
    baseURL: process.env.BASE_URL || 'http://47.96.71.23:8082',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },

  // 本地代理接口
  proxy: {
    '/zhjc-admin/': 'http://47.96.71.23:8082',
  },
}
