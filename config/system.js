module.exports = {
    NODE_ENV: "development",
    PORT: 3000,
    mongoUri: "mongodb://127.0.0.1:27017/test",
    redisUri: null,
    UPLOAD_DIR: "/tmp/.app/file", // 文件上传目录
    MAX_FILE_SIZE: 10485760 // 文件大小上限
}