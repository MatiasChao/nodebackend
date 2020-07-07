var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'losdosca_secuencize_passport',
  'losdosca_usr01',
  'G5ivarc2M2',
  {
    host: 'server343.dinamichosting.com',
    port: 3306,
    dialect: 'mysql'
  }
);

module.exports = sequelize;