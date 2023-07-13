const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection');
const routes = require('./routes/index');

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.allRoutes(server);
    this.inicializeServer(server);
  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log('Conexão estabelecida com sucesso!');
    } catch (error) {
      console.error(
        'Não foi possível estabelecer conexão com o banco de dados',
        error
      );
      throw error;
    }
  }

  async inicializeServer(app) {
    const port = 3005;
    app.listen(port, () => console.log(`Servidor executando na porta ${port}`));
  }

  async allRoutes(app) {
    app.use(routes);
  }
}

module.exports = { Server };
