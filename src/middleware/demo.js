module.exports = async function (ctx, next) {
    // 加载中间件
    ctx.logger.info("Load middleware demo");
    await next();
}