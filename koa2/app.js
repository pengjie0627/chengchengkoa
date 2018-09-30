const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static')
const path = require('path')
const KoaSession = require('koa-session');
app.keys = ["hello cc"]; // 这个和下面的signed: true有关，就随便起一个名字吧
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(KoaSession(CONFIG, app));
app.use(async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    // ctx.set("Access-Control-Max-Age", "3600");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, token");
    await next();
});

app.use(KoaStatic(
    path.join( __dirname,  'controllers/public')
))
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(bodyParser());
app.use(controller());
app.listen(3000);
console.log('app start ar port 3000...');