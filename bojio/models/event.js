"use strict";

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  });

  Event.prototype.fetch = function() {
    let result = {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      location: this.location
    };

    return Promise.all([
      this.getCategory().then((category) => {
        result.category = category.rawValues();
      }),
      this.getCreator().then((creator) => {
        result.creator = creator.rawValues();
      }),
      this.getParticipants().then((participants) => {
        result.participants = participants.map(participant => participant.rawValues());
      })
    ]).then(() => result);
  }

  var User = require('./user')(sequelize, DataTypes);
  var Category = require('./category')(sequelize, DataTypes);

  Event.belongsTo(Category);
  Event.belongsTo(User, { as: 'creator' });
  Event.belongsToMany(User, { as: 'participants', through: 'Participation' });

  return Event;
};