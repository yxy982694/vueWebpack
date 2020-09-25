import createApp from './create-app'
export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()
    // 在服务端指定默认的路由，在客户端可以自己指定默认路由
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
