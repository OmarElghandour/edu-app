module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Omar@2215",
    DB: "edume_dev",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
