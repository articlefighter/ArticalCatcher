const koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const controller = require('./controller');

const app = new koa();



controller.init(app);
app.use(serve(path.resolve(__dirname, './static')));

app.listen(3000, () => {
    console.log('running at 3000');
});
