module.exports = {
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || 4000,
        MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
        MYSQL_PORT: process.env.MYSQL_PORT || 32000,
        MYSQL_DB: process.env.MYSQL_DB || "test",
        MYSQL_USER: process.env.MYSQL_USER || "root",
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "root",
        ORIGIN_SOCKET: process.env.ORIGIN_SOCKET || 'http://localhost:3000',
        ORIGIN_REQUEST: process.env.ORIGIN_REQUEST || 'http://localhost:3000',

}