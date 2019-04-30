const fs = require("fs");
const path = require("path");
const { isObj } = require("varis");

let modelFolder = path.resolve("src/models");

let fileList = [];
try {
    fileList = fs.readdirSync(modelFolder);
} catch (e) { }

if (!fileList.length) return console.log(">> No models were found.")

for (let file of fileList) {
    if (!/\.js$/.test(file)) continue;
    let modelName = file.replace(/\.js$/, "");
    let m = require(modelFolder + "/" + file);
    if (!isObj(m)) throw new Error(`Model "${modelName}" must be an Object.`);
    module.exports[modelName] = m;
}
console.log(`>> Load models: ${Object.keys(module.exports)}`);