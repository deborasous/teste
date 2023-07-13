async function verifyRoutes() {
  return async (req, res, next) => {
    try {
      const { userPermissions } = req; // Obtém as permissões do usuário do objeto de solicitação

      const { path } = req.route; // Obtém o caminho da rota atual
      const requiredPermission = routes.find((route) => route.path === path); // Encontra a rota correspondente com base no caminho

      if (
        !requiredPermission ||
        !userPermissions.includes(requiredPermission.permissionId)
      ) {
        return res.status(403).send({
          message:
            "Acesso negado. Você não possui permissão para acessar esta rota.",
        });
      }

      next();
    } catch (error) {
      return response.status(500).send({
        message: "Autenticação Falhou",
        cause: error.message,
      });
    }
  };
}

module.exports = { verifyRoutes };
