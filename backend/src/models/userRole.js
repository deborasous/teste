const { connection } = require("../database/connection");
const { DATE, INTEGER } = require("sequelize");

const UserRole = connection.define(
  "userRole",
  {
    roleId: {
      type: INTEGER,
      references: {
        model: {
          tableName: "roles",
        },
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: INTEGER,
      references: {
        model: {
          tableName: "users",
        },
        key: "id",
      },
      allowNull: false,
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true }
);

module.exports = { UserRole };
