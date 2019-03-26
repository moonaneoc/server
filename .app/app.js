const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const path = require("path");
const compress = require('koa-compress');
const logger = require('koa-logger')
const cors = require('koa2-cors');

const router = require("./core/router");
const database = require("./core/database");
const startup = require("./core/startup");
const middlewares = require("./core/middleware");

let SYS_CONFIG = require(path.resolve(".app/config.json"));
let USER_CONFIG = {};
try {
    USER_CONFIG = require(path.resolve("app.json"));
} catch (e) { }

let db;
// 初始化函数
(async function () {
    db = await database(); // 连接数据库
    startup(db);
})()

// 数据库
app.use(async function (ctx, next) {
    Object.assign(ctx, db);
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
        maxFileSize: USER_CONFIG.MAX_FILE_SIZE || SYS_CONFIG.MAX_FILE_SIZE,    // 设置上传文件大小最大限制，默认2M
        uploadDir: USER_CONFIG.UPLOAD_DIR_PATH || SYS_CONFIG.UPLOAD_DIR_PATH
    }
}));

// 加载中间件
for (let middleware of middlewares) {
    app.use(middleware);
}

// 自动匹配路由
app.use(router.routes());

// 压缩
app.use(compress({
    threshold: 2048
}));

module.exports = app;