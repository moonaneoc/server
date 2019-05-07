let mongo = async function () {
    return new Promise(function (resolve, reject) {
        let options = {
            uri: process.env.mongo_uri || null,
            host: process.env.mongo_host || null,
            port: process.env.mongo_port || null,
            db: process.env.mongo_db || null,
            user: process.env.mongo_user || null,
            pwd: process.env.mongo_pwd || null,
        }
        let mongoUrl = options.uri || "";
        if (!mongoUrl) {
            if (options.host && options.port && options.db) {
                mongoUrl = `mongodb://${options.host}:${options.port}/${options.db}`;
                if (options.user && options.pwd) {
                    mongoUrl = `mongodb://${options.user}:${options.pwd}@${options.host}:${options.port}/${options.db}`;
                }
            }
        }

        if (mongoUrl) {
            let MongoClient = require('mongodb').MongoClient;
            MongoClient.connect(mongoUrl, { useNewUrlParser: true }, async function (err, client) {
                if (err) throw err;
                console.log(">> mongo: " + mongoUrl);
                resolve(client.db(options.db));
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
    if (process.env.redisUrl) {
        let Redis = require('ioredis');
        console.log(">>redis: " + process.env.redisUrl);
        return new Redis(process.env.redisUrl);
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