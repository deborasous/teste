const { Category } = require('../models/category');

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      console.log(name)
  
      if (!name) {
        return res.status(400).send({
          message: "Campo nome é obrigatório"
        })
      }
  
      const categoryData = await Category.create({ name });
  
      return res.status(201).send(categoryData);
      
    } catch (error) {
      console.log(error.message)
      return res.status(400).send({
        message: "Categoria não pôde ser criada"
      })
    }
  }

  async getAllCategories(req, res) {
    const categoryData = await Category.findAll({
      order: [['id', 'ASC']],
    });

    return res.status(200).send(categoryData);
  }

  async updateOneCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    await Category.update({ name }, { where: { id } });

    return res.status(204).send();
  }

  async deleteOneCategory(req, res) {
    const { id } = req.params

    await Category.destroy(
      {
        where: {id}
      }
    )

    return req.status(204).send()
  }
}

module.exports = new CategoryController();
