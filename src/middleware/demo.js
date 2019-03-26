module.exports = async function (ctx, next) {
    // 加载中间件
    await next();
}