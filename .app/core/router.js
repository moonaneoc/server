const path = require("path");
const { isFunc, isObj } = require("varis");
const logger = require("../lib/logger.js");

let config = {};
try {
  config = require(path.resolve("src/router"));
} catch (e) { }
if (!isObj(config)) throw new Error("Router must be an Object.");

module.exports = async function (ctx, next) {
  let handler = null;
  
  ctx.request.path = ctx.request.path.replace(/\/$/, "");
  let reg = new RegExp(`^/api(/[^/]+){2,}/?$`);
  if (reg.test(ctx.request.path)) {
    let routeItems = ctx.request.path.replace(/(^\/)/, "").split("/");
    routeItems.shift(); // 去掉前缀/api
    handlerName = routeItems.pop();
    let filepath = path.resolve("src/controller/" + routeItems.join("/") + ".js");
    try {
      controller = require(filepath);
      handler = controller[handlerName];
      if (!isFunc(handler)) throw "404 Not Found!";
    } catch (e) {
      ctx.status = 404;
      ctx.body = `${ctx.request.path} Not Found!`;
      return;
    }
  } else if (isFunc(config[ctx.request.path])) {
    handler = config[ctx.request.path];
  } else {
    // 404
    ctx.status = 404;
    ctx.body = `${ctx.request.path} Not Found!`;
    return;
  }

  try {
    let params = ctx._merge_params();
    await handler(params, ctx);
    await next();
  } catch (e) {
    logger.error(e);
    ctx.status = 500;
  }
}