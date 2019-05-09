module.exports = async function (ctx, next) {
    const ip = ctx.request.ip ? ctx.request.ip.replace(/^::ffff:/, "") : "null";
    const ts = Date.now();
    ctx.logger.info(`-> [${ip}] ${ctx.req.method} ${ctx.request.path}`);
    await next();
    ctx.logger.info(`<- [${ip}] ${ctx.req.method} ${ctx.request.path} ${Date.now() - ts}ms ${ctx.status}`);
}