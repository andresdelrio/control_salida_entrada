const { Sequelize } = require('sequelize');

module.exports = new Sequelize('control_restaurante', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql',
});
