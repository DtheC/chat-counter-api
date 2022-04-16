'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.describeTable('Counts')
    .then(tableDefinition => {
      if (tableDefinition.orderInStats) {
        return Promise.resolve();
      }

      return queryInterface.addColumn('Counts', 'orderInStats', Sequelize.INTEGER );
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn( 'Counts', 'orderInStats', Sequelize.INTEGER );
  }
};
