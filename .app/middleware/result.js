const Stream = require('stream');

module.exports = async function (ctx, next) {
    ctx.succeed = function (msg = "ok") {
        if (Buffer.isBuffer(msg) || msg instanceof Stream) return ctx.body = msg;

        ctx.body = {
            code: 0,
            msg: msg
        }
    }

    ctx.fail = function (msg, code = -1) {
        ctx.body = {
            code: code,
            msg: msg
        }
    }
    await next();
}