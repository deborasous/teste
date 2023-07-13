const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");
const { User } = require("../models/users");
const { Role } = require("../models/role");
const { Permission } = require("../models/permission");
config();

class UserController {
  async createOneUser(req, res) {
    try {
      const { traineeId, name, email, password } = req.body;

      const dataUsers = await User.create({
        traineeId,
        name,
        email,
        password,
      });

      return res.status(201).send(dataUsers);
    } catch (error) {
      return res.status(400).send({
        message: "Não foi possível criar o registro do usuário.",
        cause: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({
          message: "Usuário não encontrado.",
        });
      }

      // Atualize os campos desejados
      user.name = name;
      user.email = email;
      user.password = password;

      await user.save();

      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({
        message: "Não foi possível atualizar o usuário.",
        cause: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const dataUser = await User.findOne({
        where: { email: email },
        include: [
          {
            model: Role,
            as: "roles",
            through: { attributes: [] },
            include: [
              {
                model: Permission,
                as: "permissions",
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      const rolesWithPermissions = dataUser.roles.map((role) => {
        const roleObject = role.toJSON();
        const permissions = roleObject.permissions.map(
          (permission) => permission.description
        );

        return {
          ...roleObject,
          permissions: permissions,
        };
      });

      // Atualiza o objeto do usuário com as permissões dos roles
      dataUser.roles = rolesWithPermissions;

      console.log(rolesWithPermissions);

      // Acessando as permissões dos roles
      dataUser.roles.forEach((role) => {
        console.log(`Permissões do role "${role.description}":`);
        role.permissions.forEach((permission) => {
          console.log(permission);
        });
      });
      
      if (!dataUser) {
        return res.status(404).send({
          message: "Usuário não encontrado.",
        });
      }

      if (dataUser.password === password) {
        const payload = {
          email: dataUser.email,
          roles: dataUser.roles,
        };

        const token = sign(payload, process.env.SECRET_JWT);

        console.log(token, "fff");
        return res.status(200).send({
          token: "Bearer " + token,
          message: "Login realizado com sucesso!", // Adicione o prefixo "Bearer" ao token JWT
        });
      } else {
        return res.status(400).send({
          message: "Senha incorreta, você tem 3 tentativas.",
        });
      }
    } catch (error) {
      return res.status(401).send({
        message: "Tentativa de login falhou.",
        cause: error.message,
      });
    }
  }
}

module.exports = new UserController();
