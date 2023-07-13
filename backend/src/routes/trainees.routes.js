const {
  createTrainee,
  listTrainees,
  listOneTrainee,
  updateTrainee,
} = require("../controllers/trainees.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class TraineeRouter {
  router() {
    const traineeRoutes = Router();

    traineeRoutes.post("/criartrainee", auth, createTrainee);
    traineeRoutes.get("/listatrainee", listTrainees);
    traineeRoutes.get("/listaumtrainee/:id", listOneTrainee);
    traineeRoutes.get("/atualizartrainee/:id", auth, updateTrainee);

    return traineeRoutes;
  }
}

module.exports = new TraineeRouter().router();
