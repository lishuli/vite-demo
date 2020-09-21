const fs = require('fs');
const path = require('path');
const rewriteImport = require('../Util/rewriteImport')

const modulesHandler = (ctx, next) => {
  const { request: { url, query } } = ctx;
  if (url.startsWith('/@modules/')) {
    const prefix = path.resolve(__dirname, '../node_modules', url.replace('/@modules/', ''));
    
    const module = require(prefix + '/package.json').module;
    const p = path.resolve(prefix, module);
    let content = fs.readFileSync(p, 'utf-8');
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(content);
  } else {
    next();
  }
}
module.exports = modulesHandler;