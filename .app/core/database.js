const { mongoUri, redisUri } = require("./config.js").system;

let mongo = async function () {
    return new Promise(function (resolve, reject) {
        let options = {
            uri: mongoUri || null,
            host: process.env.mongoHost || null,
            port: process.env.mongoPort || null,
            db: process.env.mongoDb || null,
            user: process.env.mongoUser || null,
            pwd: process.env.mongoPwd || null,
        }
        if (!options.uri) {
            if (options.host && options.port && options.db) {
                options.uri = `mongodb://${options.host}:${options.port}/${options.db}`;
                if (options.user && options.pwd) {
                    options.uri = `mongodb://${options.user}:${options.pwd}@${options.host}:${options.port}/${options.db}`;
                }
            }
        }

        if (options.uri) {
            let MongoClient = require('mongodb').MongoClient;
            MongoClient.connect(options.uri, { useNewUrlParser: true }, async function (err, client) {
                if (err) throw err;
                console.log(">> Mongo connected " + options.uri);
                resolve(client.db());
            });
        } else {
            resolve(null);
        }
    })
}

let mysql = async function () {
    return null;
}

let redis = async function () {
    if (redisUri) {
        let Redis = require('ioredis');
        console.log(">>redis: " + redisUri);
        return new Redis(redisUri);
    }
    return null;
}

module.exports = async function () {
    let db = {
        mongo: null,
        mysql: null,
        redis: null
    };

    // 连接mongodb
    db.mongo = await mongo();

    // 连接mysql
    db.mysql = await mysql();

    // 连接redis
    db.redis = await redis();

    return db;
}