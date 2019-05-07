const fs = require("fs");
const path = require("path");
const { isFunc } = require("varis");

module.exports = function (db){
    let model = {};
    let modelFolder = path.resolve("src/models");

    let fileList = [];
    try {
        fileList = fs.readdirSync(modelFolder);
    } catch (e) { }
    
    if (!fileList.length) {
        console.log(">> No models were found.");
        return model;
    }
    
    for (let file of fileList) {
        if (!/\.js$/.test(file)) continue;
        let modelName = file.replace(/\.js$/, "");
        let _Model = require(modelFolder + "/" + file);
        if (!isFunc(_Model)) throw new Error(`Invalid Model "${modelName}".`);
        model[modelName] = new _Model(db);
    }
    console.log(`>> Load models: ${Object.keys(model)}`);

    return model;
}