const { mongoUri, redisUri } = require("./config.js").system;

let mongo = async function () {
    return new Promise(function (resolve, reject) {
        if (!mongoUri) resolve(null);

        let MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(mongoUri, { useNewUrlParser: true }, async function (err, client) {
            if (err) throw err;
            console.log(">> Mongo connected " + mongoUri);
            resolve(client.db());
        });
    })
}

let mysql = async function () {
    return null;
}

let redis = async function () {
    if (!redisUri) return null;

    let Redis = require('ioredis');
    console.log(">> Redis connected" + redisUri);
    return new Redis(redisUri);
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