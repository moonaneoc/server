module.exports = {
    env: "development",
    PORT: 3000,
    uploadDir: "/tmp/.app/file", // 文件上传目录
    maxFileSize: 10485760, // 文件大小上限
    mongoUri: "mongodb://127.0.0.1:27017/test",
    redisUri: null,
    logLevel: "debug" // 日志级别
}