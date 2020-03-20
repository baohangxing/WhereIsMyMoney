const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koajwt = require('koa-jwt');

const CONFIG = require('./config/config');
const index = require('./routes/index');
const users = require('./routes/users');
const bills = require('./routes/bill');
const types = require('./routes/type');
const usertypes = require('./routes/userType');

const errorHandle = require('./middlewares/errorHandle.js');
const sendHandle = require('./middlewares/sendHandle.js');


// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

app.use(sendHandle());
app.use(errorHandle);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

//

app.use(koajwt({
    secret: CONFIG.jwt_secret
}).unless({
    path: [/\/api\/user\/register/, /\/api\/user\/login/]
}));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(bills.routes(), bills.allowedMethods());
app.use(types.routes(), types.allowedMethods());
app.use(usertypes.routes(), usertypes.allowedMethods());


module.exports = app;
