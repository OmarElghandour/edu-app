const {UserSession} = require("./index");

module.exports = (sequelize, type) => {
   return  sequelize.define('session', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
            },
            session: type.STRING,
            token: type.STRING,
            startAt: {
                type: type.DATE,
                allowNull: true
            },
            active: {
                type: type.BOOLEAN,
                default: false
            },
            sessionOwner: type.INTEGER
        }, {
            freezeTableName: true
        });
};
