const {
  createOneContract,
  listContracts,
  listOneContract,
  deactivateContract,
} = require("../controllers/contract.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");


class ContractRouter {
  router() {
    const contractRoutes = Router();

    contractRoutes.post("/criarcontrato", auth, createOneContract);
    contractRoutes.get("/listarcontratos", auth, listContracts);
    contractRoutes.get("/listarumcontrato/:id", auth, listOneContract);
    contractRoutes.patch("/terminarcontrato/:id", auth, deactivateContract);

    return contractRoutes;
  }
}

module.exports = new ContractRouter().router();
