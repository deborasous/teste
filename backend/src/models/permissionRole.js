const { connection } = require("../database/connection");
const { DATE, INTEGER } = require("sequelize");

const PermissionRole = connection.define(
  "permissionRole",
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
    permissionId: {
      type: INTEGER,
      references: {
        model: {
          tableName: "permissions",
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

module.exports = { PermissionRole };
