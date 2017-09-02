"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelizeFixtures = require('sequelize-fixtures');
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'db.json'))[env];
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL,config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db['Event'].belongsTo(db['Category']);
db['Event'].belongsTo(db['User'], { as: 'creator' });
db['Event'].belongsToMany(db['User'], { as: 'participants', through: 'Participation' });
db['User'].belongsToMany(db['Event'], { through: 'Participation' });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Preload category.
if (process.env.PRELOAD_DB || false) {
  sequelizeFixtures.loadFile('fixtures/category.yaml', db);
  sequelizeFixtures.loadFile('fixtures/user.yaml', db);
  sequelizeFixtures.loadFile('fixtures/event.yaml', db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
