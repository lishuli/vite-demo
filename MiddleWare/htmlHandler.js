const fs = require('fs');

const htmlHandler = (ctx, next) => {
  const { request: { url, query } } = ctx;
  // 访问根路径
  if (url === '/') {
    // 访问根路径
    let content = fs.readFileSync('./index.html', 'utf-8')
    content = content.replace('<script', `
    <script>
      window.process = {
        env: {
          NODE_ENV: 'dev'
        }
      }
    </script>
    <script
    `)
    ctx.type = "text/html";
    ctx.body = content;
  } else {
    next();
  }
}

module.exports = htmlHandler;