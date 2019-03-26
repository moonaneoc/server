const fs = require("fs");
const path = require("path");
const { isArr } = require("varis");

let middlewares = [];

let fileList;
let sysFolder = path.resolve(".app/middleware");
let userFolder = path.resolve("src/middleware");

fileList = fs.readdirSync(sysFolder);
for (let file of fileList) {
    let middleware = require(sysFolder + "/" + file);
    middlewares.push(middleware);
}

let userMiddlewares;
try {
    userMiddlewares = require(userFolder + "/index.js");
} catch (e) {
    console.log(">>No middlewares were found.");
}
if (isArr(userMiddlewares) && userMiddlewares.length > 0) {
    console.log(">>Load middlewares: " + userMiddlewares.join(","));
    userMiddlewares.forEach(el => {
        middlewares.push(require(userFolder + "/" + el));
    });
}else{
    console.log(">>No middlewares were found.");
}

module.exports = middlewares;