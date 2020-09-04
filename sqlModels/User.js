module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        password: type.STRING,
        email: type.STRING,
        role : type.STRING
    }, {
        freezeTableName: true
    })
};
