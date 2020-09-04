'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable(
          'userSession',
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
              user_id : {
                  type : DataTypes.INTEGER
              },
              session_id : {
                  type : DataTypes.TEXT
              }
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
