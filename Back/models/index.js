const dbConfig = require("../db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teste = require("./teste.js")(sequelize, Sequelize);

module.exports = db;