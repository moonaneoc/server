const Router = require("koa-router");
const path = require("path");
const router = new Router({});

router.all('/*', async (ctx) => {
  let handler = null;
  try {
    let file = path.join(path.resolve("src", "router"), `${ctx.request.path}.js`);
    handler = require(file);
  } catch (e) {
    ctx.status = 404;
    ctx.body = `${ctx.request.path} Not Found!`;
    return;
  }

  try {
    let params = ctx._merge_params();
    await handler(params, ctx);
  } catch (e) {
    console.log("================================= 调用api出错 =================================");
    console.log(e);
    ctx.status = 500;
    return; 
  }
});

module.exports = router;