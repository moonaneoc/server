const path = require("path");
const { isStr, isFunc, isObj } = require("varis");

let config = {};
try {
  config = require(path.resolve("src/router"));
} catch (e) {console.log(e)}
if(!isObj(config)) throw new Error("Router must be an Object.");

module.exports = async function (ctx, next) {
  let route = config[ctx.request.path];
  if (!route || !isStr(route)) {
    ctx.status = 404;
    ctx.body = `${ctx.request.path} Not Found!`;
    return;
  }

  let splitRes = route.split(".");
  let filepath = splitRes.shift();
  let handler = splitRes.join(".");

  try {
    let ctrl = require(path.resolve("src/controller/" + filepath));
    handler = handler ? ctrl[handler] : ctrl;
    if (!isFunc(handler)) throw "404 Not Found";
  } catch (e) {
    ctx.status = 404;
    ctx.body = `${ctx.request.path} Not Found!`;
    return;
  }

  try {
    let params = ctx._merge_params();
    await handler(params, ctx);
    await next();
  } catch (e) {
    console.log("================================= 调用出错 =================================");
    console.log(e);
    ctx.status = 500;
  }
}