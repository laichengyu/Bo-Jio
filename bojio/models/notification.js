"use strict";

module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define("Notification", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    subjectUserId: DataTypes.STRING,
    objectUserId: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    eventId: DataTypes.UUID,
    type: DataTypes.ENUM('EDIT', 'REMINDER', 'TAG', 'JOIN')
  });

  Notification.prototype.rawValues = function() {
    return {
      id: this.id,
      objectUserId: this.objectUserId,
      timestamp: this.timestamp,
      read: this.read,
      eventId: this.eventId,
      type: this.type
    };
  };

  return Notification;
};
