const koa = require('koa')
const send = require('koa-send')
const path = require('path')
const app = new koa();
const isDev = process.env.NODE_ENV === 'development'
const pageRouter = require('./routers/dev-ssr.js')

app.use(async (ctx,next)=>{
  try{
    console.log(`request with path: ${ctx.path}`)
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = 500
    if (isDev) {
      ctx.body = e.message
    } else {
      ctx.body = 'pleace wait...'
    }
  }
})
app.use(async (ctx, next) => {
  console.log('路由变了...')
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})