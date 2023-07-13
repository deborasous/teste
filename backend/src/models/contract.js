const { connection } = require('../database/connection');
const { DATE, FLOAT, DATEONLY, BOOLEAN, INTEGER } = require('sequelize');
const { Trainees } = require('./trainee');
const { Category } = require('./category');
const { Company } = require('./companies');

const Contract = connection.define(
  'Contract',
  {
    traineeId: {
      type: INTEGER,
      references: {
        model: Trainees,
        key: 'id',
      },
    },
    categoryId: {
      type: INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
    },
    companyId: {
      type: INTEGER,
      references: {
        model: Company,
        key: 'id',
      },
    },
    startValidity: DATEONLY,
    endValidity: DATEONLY,
    status: BOOLEAN,
    remuneration: FLOAT,
    extra: FLOAT,
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true }
);

Contract.belongsTo(Trainees);
Contract.belongsTo(Category);
Contract.belongsTo(Company);

module.exports = { Contract };
