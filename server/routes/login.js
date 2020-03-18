const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jwt-simple');

const koaBody = require('koa-body');

const koaJwt = require('koa-jwt');//路由权限控制

const app = new Koa();
const  router = new Router();

//秘钥
const jwtSecret = 'jwtSecret';
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7;

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});

app.use(koaJwt({secret:jwtSecret}).unless({
    path:[/^\/login/]
}));

router.get('/', (ctx) => {
    ctx.body = 'Hello koa-jwt'
});

// router.use(koaJwt(jwtSecret).unless({
//     path:[/^\/login/]
// }))

router.post('/login', koaBody(), (ctx) => {

    const user = ctx.request.body;

    if (user && user.name){
        let payload = {
            exp:Date.now() + tokenExpiresTime,
            name:user.name
        };
        let token = jwt.encode(payload, jwtSecret)

        ctx.body = {
            user:user.name,
            code:1,
            token
        }
    }else {
        ctx.body = {
            code:-1
        }
    }
});

// router.use(koaJwt(jwtSecret))

router.get('/userInfo', ctx => {
    let token = ctx.header.authorization;

    ctx.body = {
        token:token,
        user:ctx.state.user
    };

    //使用jwt-simple自行解析数据
    let payload = jwt.decode(token.split(' ')[1], jwtSecret);
    console.log(payload)
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('app listening 3000...')
});
