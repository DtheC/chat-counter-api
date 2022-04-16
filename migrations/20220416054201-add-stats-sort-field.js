'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 'Counts', 'orderInStats', Sequelize.INTEGER );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn( 'Counts', 'orderInStats', Sequelize.INTEGER );
  }
};
