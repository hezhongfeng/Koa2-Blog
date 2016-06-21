"use strict";
import Sequelize from 'Sequelize'
const configs = require("../config/database.json");

const dbHost = configs.seqConfig.host;
const dbPort = configs.seqConfig.port;
const dbUsername = configs.seqConfig.userName;
const dbPassword = configs.seqConfig.password;
const dbName = configs.seqConfig.dbName;

let sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  port: dbPort
});

module.exports = sequelize;