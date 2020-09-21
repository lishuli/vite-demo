const fs = require('fs');
const path = require('path');

const jsHandler = (ctx, next) => {
  const { request: { url, query } } = ctx;
  
  if (url.endsWith('.css')) {
    const p = path.resolve(__dirname, '../', url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    console.log('2222', file);
    
    const content = `
      const css = "${file.replace(/\n/g, '')}"
      const link = document.createElement('style');
      link.setAttribute('type', 'text/css');
      document.head.appendChild(link);
      link.innerHTML = css;
      export default css;
    `;
    ctx.type = "application/javascript";
    ctx.body = content; 
  } else {
    next();
  }
}
module.exports = jsHandler;