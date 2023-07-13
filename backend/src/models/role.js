const { connection } = require("../database/connection");
const { STRING, DATE } = require("sequelize");
const { User } = require("./users");
const { UserRole } = require("./userRole");

const Role = connection.define(
  "roles",
  {
    description: {
      type: STRING,
      validate: {
        len: {
          args: [1, 100],
        },
      },
      unique: { msg: "Função já existe." },
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true }
);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = { Role };
