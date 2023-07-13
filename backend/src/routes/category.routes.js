const {
  createCategory,
  getAllCategories,
  updateOneCategory,
  deleteOneCategory,
} = require("../controllers/category.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class CategoryRouter {
  router() {
    const categoryRoutes = Router();

    categoryRoutes.post("/criarcategoria", auth, createCategory);
    categoryRoutes.get("/listarcategorias", auth, getAllCategories);
    categoryRoutes.get("/alterarcategoria/:id", auth, updateOneCategory);
    categoryRoutes.get("/excluicategoria/:id", auth,  deleteOneCategory);

    return categoryRoutes;
  }
}

module.exports = new CategoryRouter().router();
