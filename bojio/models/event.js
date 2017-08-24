"use strict";

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  });

  var User = require('./user')(sequelize, DataTypes);
  Event.belongsTo(User, { as: 'creator' });
  Event.belongsToMany(User, { as: 'participants', through: 'Participation' });

  return Event;
};