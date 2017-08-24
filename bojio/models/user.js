"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    facebookId: { type: DataTypes.STRING, primaryKey: true }
  });
  
  return User;
};