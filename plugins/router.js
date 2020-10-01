export default ({ app }) => {
  app.router.beforeEach((to, form, next) => {
    // 1.获取最新菜单信息，生成路由
    // 2.替换原本所有动态路由
    // 3.路由跳转
    app.$axios
      .$get('http://47.96.71.23:8082/zhjc-admin/inspection/sample/info/10866')
      .then((res) => {
        console.log(res)
        next()
      })
      .catch(() => {
        next()
      })
    next()
  })
}
