var Sequelize = require('sequelize');
var sequelize = require('../database');

var User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
  },
  {
       timestamps: false,
  });

module.exports = User