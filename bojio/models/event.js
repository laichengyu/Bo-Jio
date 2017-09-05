"use strict";

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    pictureUrl: DataTypes.STRING
  });

  Event.prototype.fetch = function() {
    let result = {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date.getTime(),
      location: this.location,
      pictureUrl: this.pictureUrl,
      createdAt: this.createdAt
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
      }),
    ]).then(() => result);
  }

  return Event;
};
