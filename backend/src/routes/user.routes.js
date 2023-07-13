const {
  createOneUser,
  loginUser,
  updateUser,
} = require("../controllers/user.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");


class UserRouter {
  router() {
    const userRoutes = Router();

    userRoutes.post("/criarusuario", auth, createOneUser);
    userRoutes.post("/login", loginUser);

    return userRoutes;
  }
}

module.exports = new UserRouter().router();
