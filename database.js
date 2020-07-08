var Sequelize = require('sequelize');

const UserModel = require('./models/User')


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

const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {
  console.log("Tablas sincronizadas")
})

module.exports = {
  User
}

//module.exports = sequelize;