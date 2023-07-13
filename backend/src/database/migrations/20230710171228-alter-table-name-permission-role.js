'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('permission_role', 'permission_roles');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('permission_role', 'permission_roles');
  },
};
