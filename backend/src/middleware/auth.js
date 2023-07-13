const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");
const { Op } = require("sequelize");
config();
const { Permission } = require("../models/permission");
const { Role } = require("../models/role");
const { User } = require("../models/users");
const { UserRole } = require("../models/userRole");
const { PermissionRole } = require("../models/permissionRole");

async function auth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).send({
        message: "Nenhum token de autenticação fornecido.",
      });
    }

    const token = authorizationHeader.split(" ")[1];
    const decode = verify(token, process.env.SECRET_JWT);

    req.user = decode;
    const email = decode.email; // Acessando o email do usuário

    console.log(email, "Email do usuário");

    const users = await User.findAll({
      attributes: ["name", "email", ["id", "userId"]],
      include: [
        {
          model: UserRole,
          as: "user_roles",
          include: [
            {
              model: Role,
              as: "roles",
              include: [
                {
                  model: PermissionRole,
                  as: "permission_roles",
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

    console.log(users, 'enfdfjnd')
    if (users.length === 0) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const user = users[0]; // Considerando que o email é único, pegamos apenas o primeiro usuário

    const requiretedRoute = req.path;
    const requestedRouteWithoutSlash = requiretedRoute.replace("/", "");

    const hasPermission = user.user_roles.some((role) => {
      return role.permission_roles.some((permissionRole) => {
        return (
          permissionRole.permission.description === requestedRouteWithoutSlash
        );
      });
    });

    console.log(user, "222");

    if (!hasPermission) {
      // O usuário não possui as permissões necessárias para acessar a rota
      return res.status(403).send({
        message:
          "Acesso negado. Você não possui permissão para acessar esta rota.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).send({
      message: "Autenticação falou.",
      cause: error.message,
    });
  }
}

module.exports = { auth };
