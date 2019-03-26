module.exports = async function (ctx, next) {
    // 加载中间件
    console.log("load middleware demo");
    await next();
}