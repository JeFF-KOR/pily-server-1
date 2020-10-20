'use strict';

import { Sequelize, DataTypes, ModelType } from 'sequelize'
import fs = require('fs');
import path = require('path');
const basename = path.basename(__filename);
const config:config = require(__dirname + '/../config/config.js');

interface classModel extends ModelType{
  associate?: (db:db) => void
}

interface db {
  [x:string]: classModel ;
  sequelize?: any;
  Sequelize?: any;
}

interface config {
  [x:string]: string;
}

const db:db = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
    let model:classModel = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
