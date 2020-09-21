const Koa = require('koa');
const app = new Koa();

const htmlHandler = require('./MiddleWare/htmlHandler');
const cssHandler = require('./MiddleWare/cssHandler');
const jsHandler = require('./MiddleWare/jsHandler');
const modulesHandler = require('./MiddleWare/modulesHandler');
const vueHandler = require('./MiddleWare/vueHandler');

app.use(cssHandler);
app.use(htmlHandler);
app.use(jsHandler);
app.use(modulesHandler);
app.use(vueHandler);

app.listen(9092, () => {
  console.log('listen 9092');
})