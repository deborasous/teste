const { connection, DataTypes } = require("../database/connection");
const { Role } = require("../models/role");
const { PermissionRole } = require("../models/permissionRole");
const { Permission } = require("../models/permission");
const { User } = require("../models/users");
const { UserRole } = require("../models/userRole");

// Adicione o método personalizado para a consulta complexa
Permission.findByEmail = async (email) => {
  try {
    const users = await User.findAll({
      attributes: ["name", "email", ["id", "userid"]],
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              include: [
                {
                  model: PermissionRole,
                  include: [Permission],
                },
              ],
            },
          ],
        },
      ],
      where: {
        email: email,
      },
    });
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { Permission };
