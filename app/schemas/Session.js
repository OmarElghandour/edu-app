const {UserSession} = require("./index");

module.exports = (sequelize, type) => {
   return  sequelize.define('session', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            session:{ 
                type : type.STRING,
                allowNull: true
            },
            start_date: {
                type: 'TIMESTAMP',
                allowNull: false,
                unique: true
            },
            active: {
                type: type.BOOLEAN,
                default: false
            },
            userId: type.INTEGER
        }, {
            freezeTableName: true
        });
};
