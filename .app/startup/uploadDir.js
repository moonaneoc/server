// 创建文件上传临时目录
const fs = require("fs");
const { uploadDir } = require("../core/config.js").system;

module.exports = async function (ctx) {
    let pathArr = uploadDir.split("/");
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