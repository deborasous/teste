const { Trainees } = require("../models/trainee");

class TraineeController {
  async createTrainee(req, res) {
    try {
      const {
        name,
        email,
        rg,
        cpf,
        primaryPhoneContact,
        secondaryPhoneContact,
        dateBirth,
        fatherName,
        motherName,
        haveSpecialNeeds,
      } = req.body;
      console.log(cpf, "body");
      console.log(req.body, "body");

      const traineeData = await Trainees.findOne({
        where: { cpf: cpf },
      });
      console.log(traineeData, "data");

      //verificar se o cpf já está sendo usado
      if (traineeData && req.body.cpf !== traineeData.cpf) {
        const existTrainee = await Trainees.findOne({
          where: { cpf: req.body.cpf },
        });

        if (existTrainee) {
          return res.status(400).send({
            error: "CPF já cadastrado",
          });
        }
        console.log("CPF:", existTrainee);
      }
      console.log(cpf, "1111");

      const cpfString = req.body.cpf.toString();

      const dataTrainees = await Trainees.create({
        name,
        email,
        rg,
        cpf: cpfString,
        primaryPhoneContact,
        secondaryPhoneContact,
        dateBirth,
        fatherName,
        motherName,
        haveSpecialNeeds,
      });

      return res.status(201).send(dataTrainees);
    } catch (error) {
      return res.status(400).send({
        message: "Não foi possível criar um registro de estágiario",
        cause: error.message,
      });
    }
  }

  async listTrainees(req, res) {
    const dataTrainee = await Trainees.findAll();

    return res.status(200).send(dataTrainee);
  }

  async listOneTrainee(req, res) {
    try {
      const { id } = req.params;

      const traineeData = await Trainees.findByPk(id);
      if (!traineeData) {
        return res.status(400).json({
          error: "Empresa não encontrada",
        });
      }
      return res.status(200).send(traineeData);
    } catch (error) {
      return res.status(500).json({ error: "Falha ao buscar empresa" });
    }
  }

  async updateTrainee(req, res) {
    try {
      const { id } = req.params;

      const traineeData = await Trainees.findByPk(id);
      //verificar se existe a Estagiário
      if (!traineeData) {
        return res.status(404).json({
          error: "Estagiário não encontrado",
        });
      }

      //verificar se o cpf já está sendo usado
      if (req.body.cpf && req.body.cpf !== traineeData.cpf) {
        const existTrainee = await Trainees.findOne({
          where: { cpf: req.body.cpf },
        });
        if (existTrainee) {
          return res.status(400).json({
            error: "CPF já cadastrado",
          });
        }
      }

      //atualizar as informacoes da empresa
      await traineeData.update(req.body);
      return res.state(500).json({
        error: "Falha ao atualizar a empresa",
      });
    } catch (error) {}
  }
}
module.exports = new TraineeController();
