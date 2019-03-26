const fs = require("fs");
const path = require("path");

module.exports = async function (ctx) {
    let fileList;
    let sysFolder = path.resolve(".app/startup");
    let userFolder = path.resolve("src/startup");

    fileList = fs.readdirSync(sysFolder);
    for (let file of fileList) {
        await require(sysFolder + "/" + file)(ctx);
    }

    fileList = fs.readdirSync(userFolder);
    for (let file of fileList) {
        await require(userFolder + "/" + file)(ctx);
    }
}