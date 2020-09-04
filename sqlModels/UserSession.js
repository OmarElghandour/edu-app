const {User} = require("./inedx");
const {Session} = require("./inedx");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userSession', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false,
            references : {
                model : User,
                key: 'id'
            }
        },
        session_id: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            references : {
                model : Session,
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    });
};
