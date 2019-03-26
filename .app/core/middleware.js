const fs = require("fs");
const path = require("path");

let middlewares = [];

let fileList;
let sysFolder = path.resolve(".app/middleware");
let userFolder = path.resolve("src/middleware");

fileList = fs.readdirSync(sysFolder);
for (let file of fileList) {
    let middleware = require(sysFolder + "/" + file);
    middlewares.push(middleware);
}

fileList = fs.readdirSync(userFolder);
for (let file of fileList) {
    let middleware = require(userFolder + "/" + file);
    middlewares.push(middleware);
}

module.exports = middlewares;