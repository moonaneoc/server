const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const compress = require('koa-compress');
const logger = require('koa-logger')
const cors = require('koa2-cors');
const router = require("./core/router");
const modelLoader = require("./core/model");
const database = require("./core/database");
const startup = require("./core/startup");
const middlewares = require("./core/middleware");
const config = require("./core/config.js");

let db, model;
// 初始化函数
(async function () {
    db = await database(); // 连接数据库
    model = modelLoader(db); // 加载model
    startup(db);
})()

// 引用
app.use(async function (ctx, next) {
    Object.assign(ctx, db);
    ctx.model = model;
    ctx.config = config;
    await next();
})

// 设置跨域
app.use(cors());

// 日志中间件
app.use(logger());

// body解析
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: config.maxFileSize,
        uploadDir: config.uploadDir
    }
}));

// 加载中间件
for (let middleware of middlewares) {
    app.use(middleware);
}

// 匹配路由
app.use(router);

// 压缩
app.use(compress({
    threshold: 2048
}));

module.exports = app;