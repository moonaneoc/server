const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.resolve("config");

const DEFAULT_PORT = 3000; // 默认端口号
const DEFAULT_UPLOAD_DIR = "/tmp/.app/file"; // 默认文件上传目录
const DEFAULT_MAX_FILE_SIZE = 10485760; // 文件大小上限，默认10M

let config = {};
let fileList = [];
try { fileList = fs.readdirSync(CONFIG_PATH); } catch (e) { }
for (let file of fileList) {
    let cfg = require(CONFIG_PATH + "/" + file);
    let name = file.replace(/\.[^\.]*$/, "");
    config[name] = cfg;
}

config.system = config.system || {};
config.system.PORT = config.system.PORT || DEFAULT_PORT;
config.system.uploadDir = config.system.uploadDir || DEFAULT_UPLOAD_DIR;
config.system.maxFileSize = config.system.maxFileSize || DEFAULT_MAX_FILE_SIZE;
config.system.mongoUri = config.system.mongoUri || null;
config.system.redisUri = config.system.redisUri || null;
config.system.logLevel = config.system.logLevel || "info";

module.exports = config;