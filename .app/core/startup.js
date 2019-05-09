const fs = require("fs");
const path = require("path");

module.exports = async function (ctx) {
    let sysStartups = [], userStartups = [];
    let sysFolder = path.resolve(".app/startup");
    let userFolder = path.resolve("src/startup");

    sysStartups = fs.readdirSync(sysFolder);
    for (let file of sysStartups) {
        await require(sysFolder + "/" + file)(ctx);
    }

    try { userStartups = fs.readdirSync(userFolder); } catch (e) { };
    for (let file of userStartups) {
        await require(userFolder + "/" + file)(ctx);
    }
}