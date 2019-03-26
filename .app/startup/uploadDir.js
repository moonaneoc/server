// 创建文件上传临时目录
const fs = require("fs");
const path = require("path");
const SYS_CONFIG = require(path.resolve(".app", "config.json"));

module.exports = async function (ctx) {
    let pathArr = SYS_CONFIG.UPLOAD_DIR_PATH.split("/");
    let path = "";
    try {
        if (pathArr[0] == "") {
            pathArr.shift();
            for (let dir of pathArr) {
                path = path + "/" + dir;
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
            }
        }
    } catch (e) { }
}