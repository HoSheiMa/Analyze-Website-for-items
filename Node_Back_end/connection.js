const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_project_2', 'root', '', {
  host: 'localhost',
  dialect: "mysql",
});


module.exports = sequelize;
