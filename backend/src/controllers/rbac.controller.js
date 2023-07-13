const { User } = require('../models/users');
const { Role } = require('../models/role');
const { Permission } = require('../models/permission');

class RBAC {
  async createPermission(req, res) {
    try {
      const { description } = req.body;

      if (!description) {
        return res.status(400).send({
          message: 'O campo descrição é obrigatório.',
        });
      }

      const permission = await Permission.findOne({
        where: {
          description: description,
        },
      });

      if (permission) {
        return res.status(400).send({
          message: 'Permissão já existe.',
        });
      }

      const dataPermission = await Permission.create({ description });

      return res.status(201).send({ dataPermission });
    } catch (error) {
      return res.status(400).send({
        message: 'A permissão não pode ser criada.',
        cause: error.message,
      });
    }
  }

  async listPermission(req, res) {
    const data = await Permission.findAll();
    const total = await Permission.count();

    return res.status(200).send({
      records: data,
      total,
    });
  }

  async deletePermission(req, res) {
    try {
      const { id } = req.params;

      const permission = await Permission.findByPk(id);

      if (!permission) {
        return res.status(404).send({
          message: 'Permissão não encontrada.',
        });
      }

      await permission.destroy();

      return res
        .status(201)
        .send({ message: 'Permissão excluída com sucesso!' });
    } catch (error) {
      return res.status(400).send({
        message: 'A permissão não pode ser removida.',
        cause: error.message,
      });
    }
  }

  async createRole(req, res) {
    try {
      const { description } = req.body;

      if (!description) {
        return res.status(400).send({
          message: 'A descrição é um campo obrigatório',
          cause: error.message,
        });
      }

      const role = await Role.findOne({
        where: {
          description: description,
        },
      });
      if (role) {
        return res.status(400).send({
          message: 'Função já existe',
        });
      }

      const dataRole = await Role.create({ description });

      return res.status(201).send({ dataRole });
    } catch (error) {
      return res.status(500).send({
        message: 'A função não pode ser criada',
        cause: error.message,
      });
    }
  }

  async listRole(req, res) {
    const data = await Role.findAll();
    const total = await Role.count();

    return res.status(200).send({
      records: data,
      total,
    });
  }

  async addPermissionByRole(req, res) {
    try {
      const { permissionId, roleId } = req.body;
      console.log(roleId, 'ererer');

      if (!permissionId) {
        return res.status(400).send({
          message: 'O ID da função é um campo obrigatório',
        });
      }

      if (!roleId) {
        return res.status(400).send({
          message: 'O ID da função é um campo obrigatório',
        });
      }

      const role = await Role.findOne({
        where: {
          id: roleId,
        },
      });

      if (!role) {
        return res.status(400).send({
          message: 'Função não existe',
        });
      }

      const permission = await Permission.findOne({
        where: {
          id: permissionId,
        },
      });
      console.log(permission, 'pppp');

      if (!permission) {
        return res.status(400).send({
          message: 'Permissão não existe',
        });
      }

      await role.addPermissions(permission);

      return res
        .status(201)
        .send({ message: 'Permissão atribuida com sucesso!' });
    } catch (error) {
      return res.status(500).send({
        message: 'A função não pode ser Atribuída',
        cause: error.message,
      });
    }
  }

  async listPermissionByRole(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findOne({
        where: { id: id },
        include: [
          {
            model: Permission,
            as: 'permissions',
            // through: { attributes: ['id', 'description'] },
          },
        ],
      });

      if (!role) {
        return res.status(404).send({
          message: 'Função não encontrada.',
        });
      }
      return res.status(200).send(role);
    } catch (error) {
      return res.status(500).send({
        message: 'Algo deu errado.',
        cause: error.message,
      });
    }
  }

  async addRoleUser(req, res) {
    try {
      const { userId, roleId } = req.body;

      if (!userId) {
        return res.status(400).send({
          message: 'O ID do Usuário é um campo obrigatório',
        });
      }
      if (!roleId) {
        return res.status(400).send({
          message: 'O ID da função é um campo obrigatório',
        });
      }

      const role = await Role.findOne({
        where: {
          id: roleId,
        },
      });

      if (!role) {
        return res.status(400).send({
          message: 'Função não existe',
        });
      }

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(400).send({
          message: 'Usuário não existe',
        });
      }

      await user.addRoles(role);

      return res
        .status(201)
        .send({ message: 'Função atribuida ao usuário com sucesso!' });
    } catch (error) {
      return res.status(500).send({
        message: 'A função não pode ser Atribuída',
        cause: error.message,
      });
    }
  }
}

module.exports = new RBAC();
