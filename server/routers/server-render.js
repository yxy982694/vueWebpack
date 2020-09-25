const ejs = require('ejs')
module.exports = async (ctx,renderer,template) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = {url:ctx.path}
  try {
    const appString = await renderer.renderToString(content)
    const html = ejs.render(template,{
      appString,
      style: content.renderStyles(),
      scripts: context.renderScripts() 
    })
    ctx.body = html
  } catch (e) {
    console.log('render error',e)
  }
}