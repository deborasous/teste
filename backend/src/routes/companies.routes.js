const {
  createCompany,
  listCompanies,
  listOneCompany,
  updateCompany,
} = require('../controllers/companies.controller');
const { Router } = require('express');
const { auth } = require("../middleware/auth");

class CompanyRouter {
  router() {
    const companyRoutes = Router();

    companyRoutes.post('/criarcompania', auth, createCompany);
    companyRoutes.get('/listarcompania', auth, listCompanies);
    companyRoutes.get('/listarumacompania/:id', auth, listOneCompany);
    companyRoutes.put('/atualizarcompania/:id',auth, updateCompany);

    return companyRoutes;
  }
}

module.exports = new CompanyRouter().router();
