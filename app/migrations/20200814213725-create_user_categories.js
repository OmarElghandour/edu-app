'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userCategory',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'user'
            },
            key: 'id',
            allowNull: false
          }
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'category'
            },
            key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
      });


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
