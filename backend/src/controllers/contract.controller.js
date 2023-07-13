const { Category } = require('../models/category');
const { Company } = require('../models/companies');
const { Contract } = require('../models/contract');
const { Trainees } = require('../models/trainee');

class ContractController {
  async createOneContract(req, res) {
    try {
      const {
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        remuneration,
        extra,
      } = req.body;

      // Verificar se já existe um contrato para o traineeId
      const existingContract = await Contract.findOne({
        where: { traineeId },
      });

      if (existingContract) {
        return res.status(400).send({
          message: 'Já existe um contrato para esse estagiário',
        });
      }

      const data = await Contract.create({
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        remuneration,
        extra,
      });

      return res.status(201).send(data);
    } catch (error) {
      console.error(error.message);
      return res.status(400).send({
        message: 'Não foi possível criar um registro de contrato',
        cause: error.message,
      });
    }
  }

  async listContracts(req, res) {
    const dataContract = await Contract.findAll({
      include: [
        {
          model: Trainees,
          attributes: ['name', 'primaryPhoneContact'],
        },
        {
          model: Company,
          attributes: ['companyName', 'supervisorName'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
      ],
      order: [['id', 'ASC']],
    });

    const result = dataContract.map((item) => {
      const { Trainee, Company, Category, ...rest } = item.toJSON();

      return {
        ...rest,
        traineeName: Trainee.name,
        primaryPhoneContact: Trainee.primaryPhoneContact,
        companyName: Company.companyName,
        supervisorName: Company.supervisorName,
        categoryName: Category.name,
      };
    });

    const total = await Contract.count();

    return res.status(200).send({ records: result, total });
  }

  async listOneContract(req, res) {
    try {
      const { id } = req.params;

      const contractData = await Contract.findOne({
        where: { id },
        include: [
          {
            model: Trainees,
            attributes: [
              'name',
              'email',
              'rg',
              'cpf',
              'primaryPhoneContact',
              'dateBirth',
              'fatherName',
              'motherName',
              'haveSpecialNeeds',
            ],
          },
          {
            model: Company,
            attributes: ['companyName', 'supervisorName'],
          },
          {
            model: Category,
            attributes: ['name'],
          },
        ],
      });

      return res.status(200).send(contractData);
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao buscar contrato',
        cause: error.message,
      });
    }
  }

  async deactivateContract(req, res) {
    try {
      const { id } = req.body;

      const contractData = await Contract.findOne({
        where: {
          id,
        },
      });

      if (!contractData) {
        return res.status(404).send({
          message: 'Contrato não encontrado.',
          cause: error,
          message,
        });
      }

      if (!contractData.status) {
        return res.status(400).send({
          message: 'Este contrato está inativo e não pode ser reativado.',
          cause: error.message,
        });
      }

      contractData.status = false;

      await contractData.save();

      return res.status(200).send({
        message: 'Contrato desativado com sucesso.',
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao desativar contrato.',
        cause: error.message,
      });
    }
  }
}

module.exports = new ContractController();
