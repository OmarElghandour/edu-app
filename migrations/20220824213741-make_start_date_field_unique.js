module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addConstraint('session', 
        {
          fields: ['start_date'],
          type: 'unique',
          name: 'custom_unique_constraint_name'                
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
  },
};
