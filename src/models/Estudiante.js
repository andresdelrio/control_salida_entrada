const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Estudiante = db.define('Estudiante', {
  documento: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grupo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Dentro',
  },
});

module.exports = Estudiante;
