'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      trainee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        model: {
          tableName: 'trainees',
        },
        key: 'id',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        model: {
          tableName: 'categories',
        },
        key: 'id',
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        model: {
          tableName: 'companies',
        },
        key: 'id',
      },
      start_validity: {
        type: Sequelize.DATEONLY,
        allowNull: null,
      },
      end_validity: {
        type: Sequelize.DATEONLY,
        allowNull: null,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: null,
      },
      remuneration: {
        type: Sequelize.FLOAT,
        allowNull: null,
      },
      extra: {
        type: Sequelize.FLOAT,
        allowNull: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contracts');
  },
};
