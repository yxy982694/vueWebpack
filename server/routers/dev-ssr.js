// 在这个文件中组合node渲染后的hmtl页面代码
// 包括:
//   模板文件ejs
//   在node环境中通过webpack打包后的文件代码json
//   在web环境的中通过webpack打包后的文件代码json,包括js和css的文件路径--测试
// 把这3部分组合成一个新的html,通过koa的send的ctx.body = html  发送到浏览器
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs') // 用于读取硬盘中的文件内容
const MemoryFS = require('memory-fs') // 用于读取内存中的文件内容
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
let bundle
serverCompiler.watch({},(err,stats)=>{
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err=>console.log(err))
  stats.warnings.forEach(warn => console.log(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  // 读取服务端node通过webpack打包的代码--json格式
  bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'))
  console.log('new bundle generated')
})
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急....'
    return
  }
  // 请求通过webpack-dev-server打包的代码--json格式
  const clientMainfestResp = await axios.get(
    'http://127.0.0.1:8080/public/vue-ssr-client-manifest.json'
  )
  const clientMainfest = clientMainfestResp.data
  // 读取模板代码--把二进制转为了字符串格式
  const template = fs.readFileSync(
    path.join(__dirname,'../server.template.ejs'),
    'utf-8'
  )
  //把webpack-dev-server和node-server打包的json文件经过renderer处理下
  const renderer = VueServerRenderer
        .createBundleRenderer(bundle,{
          inject: false,
          clientMainfest
        })
  await serverRender(ctx,renderer,template)
}
const router = new Router()
router.get('*',handleSSR)
module.exports = router