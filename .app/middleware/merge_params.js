module.exports = async function (ctx, next) {
    ctx._merge_params = function () {
        let query = ctx.request.query;
        let body = ctx.request.body;
        return Object.assign(query, body);
    }
    await next();
}