const { connection } = require("../database/connection");
const { STRING, DATE } = require("sequelize");
const { Role } = require("./role");
const { PermissionRole } = require("./permissionRole");

const Permission = connection.define(
  "permissions",
  {
    description: {
      type: STRING,
      validate: {
        len: {
          args: [1, 100],
        },
      },
      unique: { msg: "Permisssão já existe." },
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true }
);

//define uma associação entre as tabelas role e permission, indica que Permission pertence a Role, e through: PermissionRole indica que a acossiação será por meio de uma tabela intermediária. Permite que Permission esteja associado a vários Role
Role.belongsToMany(Permission, { through: PermissionRole });
Permission.belongsToMany(Role, { through: PermissionRole });

module.exports = { Permission };
