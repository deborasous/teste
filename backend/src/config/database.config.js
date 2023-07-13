const { config } = require('dotenv');
config();

module.exports = {
  dialect: process.env.API_DIALECT,
  host: process.env.API_HOST,
  username: process.env.API_USERNAME,
  password: process.env.API_PASSWORD,
  database: process.env.API_DATABASE,
  port: process.env.API_PORT,
  define: {
    underscored: true,
    underscoredAll: true,
  },
};
