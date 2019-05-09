const { isObj } = require("varis");
const log4js = require('log4js');
const _logger = log4js.getLogger();
const { logLevel } = require("../core/config.js").system;

_logger.level = logLevel; // all, trace, debug, info, warn, error, fatal, mark, off

function trace(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.trace(...args);
}

function debug(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.debug(...args);
}
function info(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.info(...args);
}
function warn(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.warn(...args);
}
function error(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.error(...args);
}
function fatal(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.fatal(...args);
}
function mark(...args) {
    for (let i = 0; i < args.length; i++) {
        if (isObj(args[i])) args[i] = JSON.stringify(args[i]);
    }
    _logger.mark(...args);
}

module.exports = { trace, debug, info, warn, error, fatal, mark }