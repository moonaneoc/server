const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const compress = require('koa-compress');
const cors = require('koa2-cors');
const router = require("./core/router");
const modelLoader = require("./core/model");
const database = require("./core/database");
const startup = require("./core/startup");
const middlewares = require("./core/middleware");
const config = require("./core/config.js");
const logger = require("./lib/logger.js");

(async function () {
    let db, model;
    // 初始化
    db = await database(); // 连接数据库
    const ctx = Object.assign({ logger }, db);
    model = modelLoader(ctx); // 加载model
    await startup(ctx);

    // 引用
    app.use(async function (ctx, next) {
        Object.assign(ctx, { model, config, logger }, db);
        await next();
    })

    // 设置跨域
    app.use(cors());

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

    app.listen(config.system.port);
    logger.info("Server listen port " + config.system.port);
})()