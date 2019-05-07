let route = {};

route["bar"] = async function (params, ctx) {
    ctx.model["foo"].fd.add();
    ctx.body = "ok";
}

module.exports = route;