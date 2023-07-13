const {
  createPermission,
  listPermission,
  listRole,
  createRole,
  addPermissionByRole,
  listPermissionByRole,
  addRoleUser,
  deletePermission,
} = require('../controllers/rbac.controller');
const { Router } = require('express');

class RBACRouter {
  router() {
    const rbacRoutes = Router();

    rbacRoutes.post('/criarpermissao', createPermission);
    rbacRoutes.get('/listarpermissoes', listPermission);
    rbacRoutes.delete('/excluirpermissao/:id', deletePermission);
    rbacRoutes.post('/criarfuncoes', createRole);
    rbacRoutes.get('/listarfuncoes', listRole);
    rbacRoutes.post('/addpermissaofuncao/:id', addPermissionByRole);
    rbacRoutes.get('/listarpermissaofuncao/:id', listPermissionByRole);
    rbacRoutes.post('/addfuncaousuario/:id', addRoleUser);

    return rbacRoutes;
  }
}

module.exports = new RBACRouter().router();
