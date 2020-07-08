const sequelize = require("../database");
var Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
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
}