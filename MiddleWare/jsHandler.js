const fs = require('fs');
const path = require('path');
const rewriteImport = require('../Util/rewriteImport')

const jsHandler = (ctx, next) => {
  const { request: { url, query } } = ctx;
  if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, '../', url.slice(1));
    let content = fs.readFileSync(p, 'utf-8');
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(content); 
  } else {
    next();
  }
}
module.exports = jsHandler;