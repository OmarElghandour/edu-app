'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('UserProfiles', 'firstName', { type: Sequelize.STRING}),
        queryInterface.addColumn('UserProfiles', 'lastName', { type: Sequelize.STRING}),
        queryInterface.addColumn('UserProfiles', 'phoneNumber', { type: Sequelize.INTEGER}),
        queryInterface.addColumn('UserProfiles', 'website', { type: Sequelize.STRING})
      ])
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
