let route = {};

route["bar"] = async function (params, ctx) {
    ctx.body = "ok"
}

module.exports = route;