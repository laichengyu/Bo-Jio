"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    defaultImage: DataTypes.STRING,
    icon: DataTypes.STRING,
    order_: DataTypes.INTEGER
  });

  Category.prototype.rawValues = function() {
    return {
      id: this.id,
      name: this.name,
      defaultImage: this.defaultImage
    };
  };

  return Category;
};
