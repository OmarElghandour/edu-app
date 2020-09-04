'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable(
            'session',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                },
                session : {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                token : {
                    type : DataTypes.TEXT
                },
                startAt : {
                    type : DataTypes.DATE
                },
                active : {
                    type : DataTypes.BOOLEAN,
                    defaultValue: false
                },
                sessionOwner : {
                    type : DataTypes.STRING
                },
            }
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
