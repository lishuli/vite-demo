const fs = require('fs');
const path = require('path');
const compileSfc = require('@vue/compiler-sfc');
const compilerDom = require('@vue/compiler-dom');
const rewriteImport = require('../Util/rewriteImport')

const vueHandler = (ctx) => {
  const { request: { url, query } } = ctx;
  if (url.indexOf('.vue' > -1)) {
    const p = path.resolve(__dirname, '../', url.split('?')[0].slice(1));
      
      // 解析单文件组件，许英官方的库
      let { descriptor } = compileSfc.parse(fs.readFileSync(p, 'utf-8'));
      ctx.type = 'application/javascript';
      if (!query.type) {
        // 解析js部分
        let con = descriptor.script.content.replace('export default ', 'const __script = ') +
        `import { render as __render } from "${url}?type=template"
  __script.render = __render
  export default __script`;
        ctx.body = rewriteImport(con);
      } else if (query.type === 'template') {
        // dom部分
        const template = descriptor.template.content;
        const render = compilerDom.compile(template, {mode: "module"}).code;
        ctx.body = rewriteImport(render);
      }
  }
}
module.exports = vueHandler;