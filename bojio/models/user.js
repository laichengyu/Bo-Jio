"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    facebookId: { type: DataTypes.STRING, primaryKey: true },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    isFirstTimeUser: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  });

  User.prototype.rawValues = function() {
    return {
      facebookId: this.facebookId,
      isFirstTimeUser: this.isFirstTimeUser,
    };
  };

  User.prototype.isActive = function() {
    return this.active;
  };

  User.prototype.firstTimeUser = function() {
    return this.isFirstTimeUser;
  };

  return User;
};
