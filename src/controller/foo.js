let route = {};

route["bar"] = async function (params, ctx) {
    ctx.succeed();
}

module.exports = route;